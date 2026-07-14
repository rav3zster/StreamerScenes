import React, { useRef, useCallback, useState, useEffect } from 'react';
import Moveable from 'react-moveable';
import { useEditorStore, type SceneWidget, type UserGuide } from '../../store/editorStore';
import { WidgetRenderer } from '../../renderer/WidgetRenderer';

export const CANVAS_W = 1920;
export const CANVAS_H = 1080;
const SNAP_THRESHOLD = 8;

interface Guide { x?: number; y?: number }

// ─── Ruler Horizontal Component ──────────────────────────────────────────────
const RulerHorizontal: React.FC<{ zoom: number; panX: number; onDragStart: (e: React.MouseEvent) => void }> = ({ zoom, panX, onDragStart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    ctx.fillStyle = '#0c0a1a';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height - 0.5);
    ctx.lineTo(width, height - 0.5);
    ctx.stroke();

    ctx.strokeStyle = '#42385a';
    ctx.fillStyle = '#7c6fa0';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';

    const interval = zoom > 0.35 ? 100 : 500;
    const miniInterval = interval / 10;

    const startX = -panX / zoom;
    const endX = (width - panX) / zoom;
    const firstTick = Math.floor(startX / miniInterval) * miniInterval;

    for (let cx = firstTick; cx <= endX; cx += miniInterval) {
      const sx = cx * zoom + panX;
      if (sx < 0 || sx > width) continue;

      const isMajor = Math.round(cx) % interval === 0;
      const isMid = Math.round(cx) % (interval / 2) === 0;

      ctx.beginPath();
      ctx.moveTo(sx + 0.5, height);
      if (isMajor) {
        ctx.lineTo(sx + 0.5, height - 12);
        ctx.stroke();
        ctx.fillText(Math.round(cx).toString(), sx + 3, height - 4);
      } else if (isMid) {
        ctx.lineTo(sx + 0.5, height - 7);
        ctx.stroke();
      } else if (zoom > 0.6) {
        ctx.lineTo(sx + 0.5, height - 4);
        ctx.stroke();
      }
    }
  }, [zoom, panX]);

  return (
    <div
      style={{ width: '100%', height: 20, cursor: 'row-resize', position: 'relative' }}
      onMouseDown={onDragStart}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

// ─── Ruler Vertical Component ────────────────────────────────────────────────
const RulerVertical: React.FC<{ zoom: number; panY: number; onDragStart: (e: React.MouseEvent) => void }> = ({ zoom, panY, onDragStart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    ctx.fillStyle = '#0c0a1a';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width - 0.5, 0);
    ctx.lineTo(width - 0.5, height);
    ctx.stroke();

    ctx.strokeStyle = '#42385a';
    ctx.fillStyle = '#7c6fa0';
    ctx.font = '8px monospace';
    ctx.textAlign = 'right';

    const interval = zoom > 0.35 ? 100 : 500;
    const miniInterval = interval / 10;

    const startY = -panY / zoom;
    const endY = (height - panY) / zoom;
    const firstTick = Math.floor(startY / miniInterval) * miniInterval;

    for (let cy = firstTick; cy <= endY; cy += miniInterval) {
      const sy = cy * zoom + panY;
      if (sy < 0 || sy > height) continue;

      const isMajor = Math.round(cy) % interval === 0;
      const isMid = Math.round(cy) % (interval / 2) === 0;

      ctx.beginPath();
      ctx.moveTo(width, sy + 0.5);
      if (isMajor) {
        ctx.lineTo(width - 12, sy + 0.5);
        ctx.stroke();
        ctx.save();
        ctx.translate(width - 4, sy + 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(Math.round(cy).toString(), 0, 0);
        ctx.restore();
      } else if (isMid) {
        ctx.lineTo(width - 7, sy + 0.5);
        ctx.stroke();
      } else if (zoom > 0.6) {
        ctx.lineTo(width - 4, sy + 0.5);
        ctx.stroke();
      }
    }
  }, [zoom, panY]);

  return (
    <div
      style={{ width: 20, height: '100%', cursor: 'col-resize', position: 'relative' }}
      onMouseDown={onDragStart}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

// ─── Distance Metric Helpers ─────────────────────────────────────────────────
interface DistanceLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  val: number;
  label: string;
}

export const EditorCanvas: React.FC = () => {
  const {
    zoom, pan, setPan, setZoom, snapEnabled, showGuides,
    gridMode, showRulers, userGuides,
    getDraftWidgets, selectedIds, hoveredId, isDragging, isResizing,
    selectWidget, selectWidgets, deselectAll, setHovered,
    updateWidget, pushHistory, removeSelectedWidgets,
    addWidget, zoomToFit, zoomToSelection, setGridMode,
    addUserGuide, removeUserGuide,
  } = useEditorStore();

  const canvasAreaRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ mx: 0, my: 0, px: 0, py: 0 });
  const [rubberBand, setRubberBand] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [rubberStart, setRubberStart] = useState({ x: 0, y: 0 });
  const [activeGuides, setActiveGuides] = useState<Guide[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; widgetId?: string } | null>(null);
  const [draggingGuide, setDraggingGuide] = useState<{ type: 'x' | 'y'; val: number } | null>(null);

  const widgets = getDraftWidgets();
  const selectedWidgets = widgets.filter(w => selectedIds.includes(w.id));
  const primarySelected = selectedWidgets[0];

  // Dismiss context menu
  useEffect(() => {
    const hide = () => setContextMenu(null);
    window.addEventListener('click', hide);
    return () => window.removeEventListener('click', hide);
  }, []);

  // Keyboard Shortcuts (Figma style)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Undo / Redo
      if (cmdCtrl && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) useEditorStore.getState().redo();
        else useEditorStore.getState().undo();
      }
      if (cmdCtrl && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        useEditorStore.getState().redo();
      }

      // Copy / Paste / Duplicate
      if (cmdCtrl && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        useEditorStore.getState().copySelected();
      }
      if (cmdCtrl && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        useEditorStore.getState().pasteClipboard();
      }
      if (cmdCtrl && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        selectedIds.forEach(id => useEditorStore.getState().duplicateWidget(id));
      }

      // Zoom Shortcuts
      if (cmdCtrl && e.key === '0') {
        e.preventDefault();
        zoomToFit();
      }
      if (cmdCtrl && e.key === '1') {
        e.preventDefault();
        setZoom(1);
      }
      if (cmdCtrl && e.key === '2') {
        e.preventDefault();
        zoomToSelection();
      }
      if (cmdCtrl && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        useEditorStore.getState().zoomIn();
      }
      if (cmdCtrl && e.key === '-') {
        e.preventDefault();
        useEditorStore.getState().zoomOut();
      }

      // Deletions
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        removeSelectedWidgets();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        deselectAll();
      }

      // Hide / Show UI overlays
      if (cmdCtrl && e.key === '\\') {
        e.preventDefault();
        useEditorStore.getState().togglePreviewMode();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIds, removeSelectedWidgets, deselectAll, zoomToFit, zoomToSelection, setZoom]);

  // Wheel Zoom / Pan
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.06 : 0.06;
      useEditorStore.getState().setZoom(zoom + delta);
    } else {
      // Standard scrolling acts as pan if Space/MiddleMouse is not pressed
      setPan({ x: pan.x - e.deltaX, y: pan.y - e.deltaY });
    }
  }, [zoom, pan, setPan]);

  // Pan trigger
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y });
      return;
    }

    // Rubber band selection
    if (e.button === 0 && e.target === stageRef.current) {
      deselectAll();
      const rect = stageRef.current!.getBoundingClientRect();
      setRubberStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setRubberBand({ x: e.clientX - rect.left, y: e.clientY - rect.top, w: 0, h: 0 });
    }
  }, [pan, deselectAll]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: panStart.px + (e.clientX - panStart.mx), y: panStart.py + (e.clientY - panStart.my) });
      return;
    }

    // Dragging guidelines from rulers
    if (draggingGuide && canvasAreaRef.current) {
      const rect = stageRef.current!.getBoundingClientRect();
      const cx = Math.round((e.clientX - rect.left) / zoom);
      const cy = Math.round((e.clientY - rect.top) / zoom);
      setDraggingGuide({
        type: draggingGuide.type,
        val: draggingGuide.type === 'x' ? cx : cy
      });
      return;
    }

    if (rubberBand !== null && stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      setRubberBand({
        x: Math.min(cx, rubberStart.x),
        y: Math.min(cy, rubberStart.y),
        w: Math.abs(cx - rubberStart.x),
        h: Math.abs(cy - rubberStart.y),
      });
    }
  }, [isPanning, panStart, rubberBand, rubberStart, setPan, draggingGuide, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);

    if (draggingGuide) {
      addUserGuide(draggingGuide.type, draggingGuide.val);
      setDraggingGuide(null);
      return;
    }

    if (rubberBand && stageRef.current) {
      const rx = rubberBand.x / zoom;
      const ry = rubberBand.y / zoom;
      const rw = rubberBand.w / zoom;
      const rh = rubberBand.h / zoom;
      if (rw > 4 && rh > 4) {
        const inside = widgets.filter(w =>
          w.x < rx + rw && w.x + w.width > rx &&
          w.y < ry + rh && w.y + w.height > ry &&
          !w.locked
        );
        if (inside.length) selectWidgets(inside.map(w => w.id));
      }
      setRubberBand(null);
    }
  }, [rubberBand, zoom, widgets, selectWidgets, draggingGuide, addUserGuide]);

  // Guidelines drag start
  const handleRulerMouseDown = (type: 'x' | 'y') => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = stageRef.current!.getBoundingClientRect();
    const cx = Math.round((e.clientX - rect.left) / zoom);
    const cy = Math.round((e.clientY - rect.top) / zoom);
    setDraggingGuide({ type, val: type === 'x' ? cx : cy });
  };

  // Snapping logic
  const computeSnap = (x: number, y: number, w: number, h: number, excludeIds: string[]) => {
    if (!snapEnabled) return { dx: 0, dy: 0, guides: [] };
    const others = widgets.filter(ww => !excludeIds.includes(ww.id));
    const guides: Guide[] = [];
    let dx = 0, dy = 0;

    // Snapping points: edges, center coordinates, user guides
    const snapXCandidates = [0, CANVAS_W / 2, CANVAS_W];
    const snapYCandidates = [0, CANVAS_H / 2, CANVAS_H];

    // Add user guidelines to candidates
    userGuides.forEach(ug => {
      if (ug.type === 'x') snapXCandidates.push(ug.val);
      if (ug.type === 'y') snapYCandidates.push(ug.val);
    });

    others.forEach(o => {
      snapXCandidates.push(o.x, o.x + o.width / 2, o.x + o.width);
      snapYCandidates.push(o.y, o.y + o.height / 2, o.y + o.height);
    });

    for (const sx of snapXCandidates) {
      if (Math.abs(x - sx) < SNAP_THRESHOLD) { dx = sx - x; guides.push({ x: sx }); break; }
      if (Math.abs(x + w - sx) < SNAP_THRESHOLD) { dx = sx - (x + w); guides.push({ x: sx }); break; }
      if (Math.abs(x + w / 2 - sx) < SNAP_THRESHOLD) { dx = sx - (x + w / 2); guides.push({ x: sx }); break; }
    }
    for (const sy of snapYCandidates) {
      if (Math.abs(y - sy) < SNAP_THRESHOLD) { dy = sy - y; guides.push({ y: sy }); break; }
      if (Math.abs(y + h - sy) < SNAP_THRESHOLD) { dy = sy - (y + h); guides.push({ y: sy }); break; }
      if (Math.abs(y + h / 2 - sy) < SNAP_THRESHOLD) { dy = sy - (y + h / 2); guides.push({ y: sy }); break; }
    }
    return { dx, dy, guides };
  };

  // Drag handlers
  const handleDrag = useCallback((e: { target: SVGElement | HTMLElement; beforeTranslate: number[] }) => {
    const target = e.target as HTMLElement;
    const id = target.dataset.id;
    if (!id) return;
    const widget = widgets.find(w => w.id === id)!;
    let nx = Math.round(e.beforeTranslate[0] / zoom);
    let ny = Math.round(e.beforeTranslate[1] / zoom);
    const { dx, dy, guides } = computeSnap(nx, ny, widget.width, widget.height, [id]);
    nx += dx; ny += dy;
    setActiveGuides(guides);
    updateWidget(id, { x: nx, y: ny });
    target.style.transform = `translate(${nx * zoom}px,${ny * zoom}px) rotate(${widget.rotation}deg)`;
  }, [widgets, zoom, snapEnabled, updateWidget]);

  const handleDragEnd = useCallback(() => {
    setActiveGuides([]);
    pushHistory();
    useEditorStore.getState().setIsDragging(false);
  }, [pushHistory]);

  // Resize handlers
  const handleResize = useCallback((e: { target: SVGElement | HTMLElement; width: number; height: number; drag: { beforeTranslate: number[] } }) => {
    const target = e.target as HTMLElement;
    const id = target.dataset.id;
    if (!id) return;
    const nw = Math.round(Math.max(10, e.width / zoom));
    const nh = Math.round(Math.max(10, e.height / zoom));
    const nx = Math.round(e.drag.beforeTranslate[0] / zoom);
    const ny = Math.round(e.drag.beforeTranslate[1] / zoom);
    updateWidget(id, { width: nw, height: nh, x: nx, y: ny });
    target.style.width = `${nw * zoom}px`;
    target.style.height = `${nh * zoom}px`;
    target.style.transform = `translate(${nx * zoom}px,${ny * zoom}px) rotate(${widgets.find(w => w.id === id)?.rotation ?? 0}deg)`;
  }, [zoom, updateWidget, widgets]);

  const handleResizeEnd = useCallback(() => {
    pushHistory();
    useEditorStore.getState().setIsResizing(false);
  }, [pushHistory]);

  // Rotate handlers
  const handleRotate = useCallback((e: { target: SVGElement | HTMLElement; rotation: number }) => {
    const target = e.target as HTMLElement;
    const id = target.dataset.id;
    if (!id) return;
    const rot = Math.round(e.rotation);
    updateWidget(id, { rotation: rot });
    const w = widgets.find(ww => ww.id === id)!;
    target.style.transform = `translate(${w.x * zoom}px,${w.y * zoom}px) rotate(${rot}deg)`;
  }, [widgets, zoom, updateWidget]);

  const handleRotateEnd = useCallback(() => { pushHistory(); }, [pushHistory]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('application/widget-type');
    if (!raw) return;
    const { type, defaultWidth, defaultHeight, defaultStyle } = JSON.parse(raw);
    const rect = stageRef.current!.getBoundingClientRect();
    const cx = Math.round((e.clientX - rect.left) / zoom);
    const cy = Math.round((e.clientY - rect.top) / zoom);
    const maxZ = widgets.reduce((m, w) => Math.max(m, w.zIndex), 0);

    const label = type.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
    useEditorStore.getState().addRecentWidget(type);

    addWidget({
      id: `w-${crypto.randomUUID()}`,
      type,
      label,
      x: Math.max(0, cx - Math.round(defaultWidth / 2)),
      y: Math.max(0, cy - Math.round(defaultHeight / 2)),
      width: defaultWidth,
      height: defaultHeight,
      rotation: 0,
      opacity: 100,
      scale: 1,
      zIndex: maxZ + 1,
      visible: true,
      locked: false,
      style: defaultStyle ?? {},
      animation: { type: 'none', duration: 1, delay: 0, loop: false },
      content: { type, settings: {} },
    });
  }, [zoom, widgets, addWidget]);

  // Distance Metric lines mapping (similar to Figma spacing guides)
  const getDistanceLines = (): DistanceLine[] => {
    if (!primarySelected || isPanning) return [];
    const lines: DistanceLine[] = [];
    const a = primarySelected;

    // Bounds of primary selection
    const al = a.x;
    const ar = a.x + a.width;
    const at = a.y;
    const ab = a.y + a.height;
    const acx = a.x + a.width / 2;
    const acy = a.y + a.height / 2;

    // Distances to canvas margins
    lines.push({ x1: al, y1: acy, x2: 0, y2: acy, val: al, label: `${Math.round(al)}` });
    lines.push({ x1: ar, y1: acy, x2: CANVAS_W, y2: acy, val: CANVAS_W - ar, label: `${Math.round(CANVAS_W - ar)}` });
    lines.push({ x1: acx, y1: at, x2: acx, y2: 0, val: at, label: `${Math.round(at)}` });
    lines.push({ x1: acx, y1: ab, x2: acx, y2: CANVAS_H, val: CANVAS_H - ab, label: `${Math.round(CANVAS_H - ab)}` });

    // Distances to closest adjacent element
    const others = widgets.filter(w => w.id !== a.id && w.visible);
    let leftWidget: SceneWidget | null = null;
    let rightWidget: SceneWidget | null = null;
    let topWidget: SceneWidget | null = null;
    let bottomWidget: SceneWidget | null = null;

    others.forEach(o => {
      // Horizontal checks
      if (o.y + o.height > at && o.y < ab) {
        if (o.x + o.width <= al) {
          if (!leftWidget || o.x + o.width > leftWidget.x + leftWidget.width) leftWidget = o;
        }
        if (o.x >= ar) {
          if (!rightWidget || o.x < rightWidget.x) rightWidget = o;
        }
      }
      // Vertical checks
      if (o.x + o.width > al && o.x < ar) {
        if (o.y + o.height <= at) {
          if (!topWidget || o.y + o.height > topWidget.y + topWidget.height) topWidget = o;
        }
        if (o.y >= ab) {
          if (!bottomWidget || o.y < bottomWidget.y) bottomWidget = o;
        }
      }
    });

    if (leftWidget) {
      const target = leftWidget as SceneWidget;
      const gap = al - (target.x + target.width);
      lines.push({ x1: al, y1: acy, x2: target.x + target.width, y2: acy, val: gap, label: `${Math.round(gap)}` });
    }
    if (rightWidget) {
      const target = rightWidget as SceneWidget;
      const gap = target.x - ar;
      lines.push({ x1: ar, y1: acy, x2: target.x, y2: acy, val: gap, label: `${Math.round(gap)}` });
    }
    if (topWidget) {
      const target = topWidget as SceneWidget;
      const gap = at - (target.y + target.height);
      lines.push({ x1: acx, y1: at, x2: acx, y2: target.y + target.height, val: gap, label: `${Math.round(gap)}` });
    }
    if (bottomWidget) {
      const target = bottomWidget as SceneWidget;
      const gap = target.y - ab;
      lines.push({ x1: acx, y1: ab, x2: acx, y2: target.y, val: gap, label: `${Math.round(gap)}` });
    }

    return lines;
  };

  const distanceLines = getDistanceLines();
  const stageW = CANVAS_W * zoom;
  const stageH = CANVAS_H * zoom;

  return (
    <div
      ref={canvasAreaRef}
      className="canvas-area"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      onContextMenu={e => { e.preventDefault(); }}
      style={{
        cursor: isPanning ? 'grabbing' : 'default',
        display: 'grid',
        gridTemplateColumns: showRulers ? '20px 1fr' : '1fr',
        gridTemplateRows: showRulers ? '20px 1fr' : '1fr',
      }}
    >
      {/* Corner Intersection Box */}
      {showRulers && (
        <div style={{
          gridColumn: 1, gridRow: 1,
          background: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          zIndex: 10,
        }} />
      )}

      {/* Top horizontal Ruler */}
      {showRulers && (
        <div style={{ gridColumn: 2, gridRow: 1, overflow: 'hidden', zIndex: 9, borderBottom: '1px solid var(--color-border)' }}>
          <RulerHorizontal zoom={zoom} panX={pan.x} onDragStart={handleRulerMouseDown('y')} />
        </div>
      )}

      {/* Left vertical Ruler */}
      {showRulers && (
        <div style={{ gridColumn: 1, gridRow: 2, overflow: 'hidden', zIndex: 9, borderRight: '1px solid var(--color-border)' }}>
          <RulerVertical zoom={zoom} panY={pan.y} onDragStart={handleRulerMouseDown('x')} />
        </div>
      )}

      {/* Infinite Stage container */}
      <div
        style={{
          gridColumn: showRulers ? 2 : 1,
          gridRow: showRulers ? 2 : 1,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          className="canvas-wrapper"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
        >
          <div
            ref={stageRef}
            className={`canvas-stage ${gridMode === 'dots' ? 'grid-dots' : gridMode === 'lines' ? 'grid-lines' : 'grid-off'}`}
            style={{ width: stageW, height: stageH }}
            data-canvas="true"
            onMouseDown={e => {
              if (e.target === stageRef.current) {
                deselectAll();
              }
            }}
          >
            {/* Safe Area Guides */}
            {showGuides && (
              <>
                {/* 90% Action Safe */}
                <div style={{
                  position: 'absolute',
                  left: 96 * zoom, top: 54 * zoom,
                  width: (CANVAS_W - 192) * zoom, height: (CANVAS_H - 108) * zoom,
                  border: '1.5px dashed rgba(92,255,226,0.3)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }} title="Action Safe Zone (90%)" />
                {/* 93% Title Safe */}
                <div style={{
                  position: 'absolute',
                  left: 134 * zoom, top: 75 * zoom,
                  width: (CANVAS_W - 268) * zoom, height: (CANVAS_H - 150) * zoom,
                  border: '1px dashed rgba(168,85,247,0.3)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }} title="Title Safe Zone (93%)" />
              </>
            )}

            {/* Widgets list */}
            {[...widgets].sort((a, b) => a.zIndex - b.zIndex).map(widget => (
              <div
                key={widget.id}
                data-id={widget.id}
                className={[
                  'canvas-widget',
                  selectedIds.includes(widget.id) ? 'selected' : '',
                  hoveredId === widget.id && !selectedIds.includes(widget.id) ? 'hovered' : '',
                  widget.locked ? 'locked' : '',
                ].join(' ')}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: widget.width * zoom,
                  height: widget.height * zoom,
                  transform: `translate(${widget.x * zoom}px, ${widget.y * zoom}px) rotate(${widget.rotation}deg)`,
                  opacity: widget.visible ? widget.opacity / 100 : 0,
                  zIndex: widget.zIndex,
                  transformOrigin: 'top left',
                  pointerEvents: widget.locked ? 'none' : 'all',
                }}
                onMouseEnter={() => setHovered(widget.id)}
                onMouseLeave={() => setHovered(null)}
                onMouseDown={e => {
                  if (widget.locked) return;
                  e.stopPropagation();
                  selectWidget(widget.id, e.shiftKey || e.metaKey || e.ctrlKey);
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  selectWidget(widget.id);
                  setContextMenu({ x: e.clientX, y: e.clientY, widgetId: widget.id });
                }}
              >
                <div style={{
                  width: '100%', height: '100%',
                  overflow: 'hidden',
                  borderRadius: widget.style?.borderRadius ? `${widget.style.borderRadius}px` : 0
                }}>
                  <WidgetRenderer widget={widget} zoom={zoom} animated={false} />
                </div>

                {/* Bounding dimensions badge (Figma style) */}
                {selectedIds.includes(widget.id) && (isDragging || isResizing) && (
                  <div style={{
                    position: 'absolute',
                    bottom: -22,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--color-accent)',
                    color: 'white',
                    fontSize: 9,
                    fontFamily: 'var(--font-mono)',
                    padding: '2px 6px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    zIndex: 1000,
                    pointerEvents: 'none',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    {Math.round(widget.width)} × {Math.round(widget.height)}
                  </div>
                )}
              </div>
            ))}

            {/* Smart snapping guides */}
            {showGuides && activeGuides.map((g, i) => (
              <div key={i} className={`guide-line ${g.x !== undefined ? 'vertical' : 'horizontal'}`}
                style={g.x !== undefined ? { left: g.x * zoom } : { top: g.y! * zoom }} />
            ))}

            {/* User guidelines */}
            {showGuides && userGuides.map(ug => (
              <div
                key={ug.id}
                className={`guide-line user-guide ${ug.type === 'x' ? 'vertical' : 'horizontal'}`}
                style={{
                  left: ug.type === 'x' ? ug.val * zoom : undefined,
                  top: ug.type === 'y' ? ug.val * zoom : undefined,
                  borderColor: '#ff4dff',
                  boxShadow: '0 0 4px #ff4dff',
                  cursor: ug.type === 'x' ? 'col-resize' : 'row-resize',
                  pointerEvents: 'all',
                }}
                onDoubleClick={() => removeUserGuide(ug.id)}
                title="Double click to remove guide"
              >
                <span style={{
                  position: 'absolute',
                  top: ug.type === 'x' ? 8 : -14,
                  left: ug.type === 'x' ? 4 : 8,
                  fontSize: 8,
                  fontFamily: 'var(--font-mono)',
                  color: '#ff4dff',
                  background: '#0c0a1a',
                  padding: '1px 3px',
                  borderRadius: 2,
                  whiteSpace: 'nowrap',
                }}>
                  {ug.type === 'x' ? `X:${Math.round(ug.val)}` : `Y:${Math.round(ug.val)}`}
                </span>
              </div>
            ))}

            {/* Distance spacing line metric tags (Figma Style) */}
            {showGuides && (isDragging || isResizing) && distanceLines.map((line, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: Math.min(line.x1, line.x2) * zoom,
                  top: Math.min(line.y1, line.y2) * zoom,
                  width: Math.max(1, Math.abs(line.x1 - line.x2) * zoom),
                  height: Math.max(1, Math.abs(line.y1 - line.y2) * zoom),
                  borderLeft: line.x1 === line.x2 ? '1px dashed #ef4444' : 'none',
                  borderTop: line.y1 === line.y2 ? '1px dashed #ef4444' : 'none',
                  pointerEvents: 'none',
                  zIndex: 900,
                }}
              >
                <span style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: 8,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  padding: '1px 3px',
                  borderRadius: 2,
                  whiteSpace: 'nowrap',
                }}>
                  {line.label}
                </span>
              </div>
            ))}

            {/* Preview Guide dragging from ruler */}
            {draggingGuide && (
              <div
                className={`guide-line preview-guide ${draggingGuide.type === 'x' ? 'vertical' : 'horizontal'}`}
                style={{
                  left: draggingGuide.type === 'x' ? draggingGuide.val * zoom : undefined,
                  top: draggingGuide.type === 'y' ? draggingGuide.val * zoom : undefined,
                  borderColor: '#ff4dff',
                  borderStyle: 'dashed',
                  boxShadow: '0 0 6px rgba(255,77,255,0.7)',
                }}
              />
            )}

            {/* Rubber Band */}
            {rubberBand && rubberBand.w > 2 && rubberBand.h > 2 && (
              <div className="rubber-band" style={{ left: rubberBand.x, top: rubberBand.y, width: rubberBand.w, height: rubberBand.h }} />
            )}
          </div>
        </div>
      </div>

      {/* Moveable Bounding Box resize handlers */}
      {selectedWidgets.length > 0 && !selectedWidgets.some(w => w.locked) && (
        <Moveable
          ref={moveableRef}
          target={selectedWidgets.map(w => stageRef.current?.querySelector(`[data-id="${w.id}"]`) as HTMLElement).filter(Boolean)}
          container={canvasAreaRef.current}
          draggable
          resizable
          rotatable
          snappable={snapEnabled}
          snapThreshold={SNAP_THRESHOLD * zoom}
          keepRatio={false}
          throttleDrag={0}
          onDragStart={() => useEditorStore.getState().setIsDragging(true)}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onResizeStart={() => useEditorStore.getState().setIsResizing(true)}
          onResize={handleResize}
          onResizeEnd={handleResizeEnd}
          onRotate={handleRotate}
          onRotateEnd={handleRotateEnd}
        />
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={e => e.stopPropagation()}
        >
          {contextMenu.widgetId && (
            <>
              <div className="context-menu-item" onClick={() => { useEditorStore.getState().duplicateWidget(contextMenu.widgetId!); setContextMenu(null); }}>
                <span>⧉</span> Duplicate <span className="context-menu-shortcut">⌘D</span>
              </div>
              <div className="context-menu-item" onClick={() => { useEditorStore.getState().bringToFront(contextMenu.widgetId!); setContextMenu(null); }}>
                <span>⬆</span> Bring to Front
              </div>
              <div className="context-menu-item" onClick={() => { useEditorStore.getState().sendToBack(contextMenu.widgetId!); setContextMenu(null); }}>
                <span>⬇</span> Send to Back
              </div>
              <div className="context-menu-item" onClick={() => { useEditorStore.getState().updateWidget(contextMenu.widgetId!, { locked: !widgets.find(w => w.id === contextMenu.widgetId)?.locked }); setContextMenu(null); }}>
                <span>🔒</span> {widgets.find(w => w.id === contextMenu.widgetId)?.locked ? 'Unlock' : 'Lock'}
              </div>
              <div className="context-menu-item" onClick={() => { useEditorStore.getState().updateWidget(contextMenu.widgetId!, { visible: !widgets.find(w => w.id === contextMenu.widgetId)?.visible }); setContextMenu(null); }}>
                <span>👁</span> {widgets.find(w => w.id === contextMenu.widgetId)?.visible ? 'Hide' : 'Show'}
              </div>
              <div className="context-menu-separator" />
              <div className="context-menu-item" onClick={() => { useEditorStore.getState().copySelected(); setContextMenu(null); }}>
                <span>⧉</span> Copy <span className="context-menu-shortcut">⌘C</span>
              </div>
            </>
          )}
          <div className="context-menu-separator" />
          <div className="context-menu-item" onClick={() => { useEditorStore.getState().pasteClipboard(); setContextMenu(null); }}>
            <span>⧇</span> Paste <span className="context-menu-shortcut">⌘V</span>
          </div>
          <div className="context-menu-separator" />
          <div className="context-menu-item danger" onClick={() => { removeSelectedWidgets(); setContextMenu(null); }}>
            <span>✕</span> Delete <span className="context-menu-shortcut">Del</span>
          </div>
        </div>
      )}
    </div>
  );
};
