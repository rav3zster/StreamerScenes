import React, { useRef, useCallback, useState, useEffect } from 'react';
import Moveable from 'react-moveable';
import { Plus } from 'lucide-react';
import { useEditorStore, type SceneWidget, type UserGuide } from '../../store/editorStore';
import { SceneRenderer } from '../../renderer/SceneRenderer';
import { TransitionOverlay } from '../../transitions/components/TransitionOverlay';

export const CANVAS_W = 1920;
export const CANVAS_H = 1080;
const SNAP_THRESHOLD = 14;
const SNAP_STICKY_THRESHOLD = 28;

interface Guide { x?: number; y?: number }


// ─── Ruler Horizontal Component ──────────────────────────────────────────────
const RulerHorizontal: React.FC<{ zoom: number; panX: number; onDragStart: (e: React.MouseEvent) => void }> = ({ zoom, panX, onDragStart }) => {
  const { editorTheme } = useEditorStore();
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

    const isLight = editorTheme === 'light';
    ctx.fillStyle = isLight ? '#ffffff' : '#0c0a1a';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = isLight ? '#e5e7eb' : 'rgba(139, 92, 246, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height - 0.5);
    ctx.lineTo(width, height - 0.5);
    ctx.stroke();

    ctx.strokeStyle = isLight ? '#9ca3af' : '#42385a';
    ctx.fillStyle = isLight ? '#6b7280' : '#7c6fa0';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';

    const interval = zoom > 0.35 ? 100 : 500;
    const miniInterval = interval / 10;

    const stageW = 1920 * zoom;
    const offsetX = (width - stageW) / 2 + panX;

    const startX = -offsetX / zoom;
    const endX = (width - offsetX) / zoom;
    const firstTick = Math.floor(startX / miniInterval) * miniInterval;

    for (let cx = firstTick; cx <= endX; cx += miniInterval) {
      const sx = cx * zoom + offsetX;
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
  }, [zoom, panX, editorTheme]);

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
  const { editorTheme } = useEditorStore();
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

    const isLight = editorTheme === 'light';
    ctx.fillStyle = isLight ? '#ffffff' : '#0c0a1a';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = isLight ? '#e5e7eb' : 'rgba(139, 92, 246, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width - 0.5, 0);
    ctx.lineTo(width - 0.5, height);
    ctx.stroke();

    ctx.strokeStyle = isLight ? '#9ca3af' : '#42385a';
    ctx.fillStyle = isLight ? '#6b7280' : '#7c6fa0';
    ctx.font = '8px monospace';
    ctx.textAlign = 'right';

    const interval = zoom > 0.35 ? 100 : 500;
    const miniInterval = interval / 10;

    const stageH = 1080 * zoom;
    const offsetY = (height - stageH) / 2 + panY;

    const startY = -offsetY / zoom;
    const endY = (height - offsetY) / zoom;
    const firstTick = Math.floor(startY / miniInterval) * miniInterval;

    for (let cy = firstTick; cy <= endY; cy += miniInterval) {
      const sy = cy * zoom + offsetY;
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
  }, [zoom, panY, editorTheme]);

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
    addWidget, zoomToFit, setGridMode,
    addUserGuide, removeUserGuide,
  } = useEditorStore();

  const canvasAreaRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ mx: 0, my: 0, px: 0, py: 0 });

  // Live Transform HUD state
  const [hudData, setHudData] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    rotation: number;
    visible: boolean;
  }>({ x: 0, y: 0, w: 0, h: 0, rotation: 0, visible: false });

  // Viewport tracking for scrollbars and centering offset calculations
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = canvasAreaRef.current;
    if (!el) return;

    const observer = new ResizeObserver(entries => {
      const rect = entries[0].contentRect;
      setViewport({
        w: rect.width - (showRulers ? 20 : 0),
        h: rect.height - (showRulers ? 20 : 0)
      });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [showRulers]);

  // State for scrollbars dragging
  const [draggingScroll, setDraggingScroll] = useState<'h' | 'v' | null>(null);
  const scrollDragStart = useRef({ mouseStart: 0, panStart: 0 });

  const stageW = CANVAS_W * zoom;
  const stageH = CANVAS_H * zoom;

  // Horizontal scrollbar calculations
  const centerOffsetX = (viewport.w - stageW) / 2;
  const minX = -stageW + 150 - centerOffsetX;
  const maxX = viewport.w - 150 - centerOffsetX;
  const rangeX = maxX - minX;

  const trackW = viewport.w - 32;
  const thumbW = rangeX > 0 ? Math.max(30, Math.min(trackW, (viewport.w / (stageW + viewport.w)) * trackW)) : trackW;
  const pctX = rangeX > 0 ? (pan.x - minX) / rangeX : 0;
  const thumbLeft = pctX * (trackW - thumbW);

  // Vertical scrollbar calculations
  const centerOffsetY = (viewport.h - stageH) / 2;
  const minY = -stageH + 100 - centerOffsetY;
  const maxY = viewport.h - 100 - centerOffsetY;
  const rangeY = maxY - minY;

  const trackH = viewport.h - 32;
  const thumbH = rangeY > 0 ? Math.max(30, Math.min(trackH, (viewport.h / (stageH + viewport.h)) * trackH)) : trackH;
  const pctY = rangeY > 0 ? (pan.y - minY) / rangeY : 0;
  const thumbTop = pctY * (trackH - thumbH);

  const startDragScrollH = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingScroll('h');
    scrollDragStart.current = { mouseStart: e.clientX, panStart: pan.x };
  };

  const startDragScrollV = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingScroll('v');
    scrollDragStart.current = { mouseStart: e.clientY, panStart: pan.y };
  };

  useEffect(() => {
    if (!draggingScroll) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (draggingScroll === 'h') {
        const deltaX = e.clientX - scrollDragStart.current.mouseStart;
        const hRange = trackW - thumbW;
        const deltaPct = hRange > 0 ? deltaX / hRange : 0;
        const newPanX = scrollDragStart.current.panStart + deltaPct * rangeX;
        setPan({ x: newPanX, y: pan.y });
      } else if (draggingScroll === 'v') {
        const deltaY = e.clientY - scrollDragStart.current.mouseStart;
        const vRange = trackH - thumbH;
        const deltaPct = vRange > 0 ? deltaY / vRange : 0;
        const newPanY = scrollDragStart.current.panStart + deltaPct * rangeY;
        setPan({ x: pan.x, y: newPanY });
      }
    };

    const handleMouseUp = () => {
      setDraggingScroll(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingScroll, trackW, thumbW, rangeX, trackH, thumbH, rangeY, pan, setPan]);
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

      // Copy / Paste / Duplicate / Group
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
      if (cmdCtrl && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        if (e.shiftKey) {
          useEditorStore.getState().ungroupSelected();
        } else {
          useEditorStore.getState().groupSelected();
        }
      }

      // Precision Keyboard Nudging (1px / 10px)
      if (selectedIds.length > 0 && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
        const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;

        selectedIds.forEach(id => {
          const w = widgets.find(item => item.id === id);
          if (w) {
            updateWidget(id, { x: w.x + dx, y: w.y + dy });
          }
        });
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
  }, [selectedIds, removeSelectedWidgets, deselectAll, zoomToFit, setZoom, widgets, updateWidget]);

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

  // Active sticky snap tracking refs (for magnetic hysteresis)
  const activeSnapXRef = useRef<{ snapVal: number; offsetType: 'left' | 'right' | 'center' } | null>(null);
  const activeSnapYRef = useRef<{ snapVal: number; offsetType: 'top' | 'bottom' | 'center' } | null>(null);

  // Snapping logic with magnetic sticky hysteresis
  const computeSnap = (x: number, y: number, w: number, h: number, excludeIds: string[]) => {
    if (!snapEnabled) {
      activeSnapXRef.current = null;
      activeSnapYRef.current = null;
      return { dx: 0, dy: 0, guides: [] };
    }
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

    // ── X-AXIS MAGNETIC STICKY SNAP ──────────────────────────────────────────
    let xHandled = false;
    if (activeSnapXRef.current) {
      const { snapVal, offsetType } = activeSnapXRef.current;
      const currentPos = offsetType === 'left' ? x : offsetType === 'right' ? x + w : x + w / 2;
      const dist = Math.abs(currentPos - snapVal);

      if (dist < SNAP_STICKY_THRESHOLD) {
        dx = offsetType === 'left' ? snapVal - x : offsetType === 'right' ? snapVal - (x + w) : snapVal - (x + w / 2);
        guides.push({ x: snapVal });
        xHandled = true;
      } else {
        activeSnapXRef.current = null;
      }
    }

    if (!xHandled) {
      for (const sx of snapXCandidates) {
        if (Math.abs(x - sx) < SNAP_THRESHOLD) {
          dx = sx - x; guides.push({ x: sx });
          activeSnapXRef.current = { snapVal: sx, offsetType: 'left' };
          break;
        }
        if (Math.abs(x + w - sx) < SNAP_THRESHOLD) {
          dx = sx - (x + w); guides.push({ x: sx });
          activeSnapXRef.current = { snapVal: sx, offsetType: 'right' };
          break;
        }
        if (Math.abs(x + w / 2 - sx) < SNAP_THRESHOLD) {
          dx = sx - (x + w / 2); guides.push({ x: sx });
          activeSnapXRef.current = { snapVal: sx, offsetType: 'center' };
          break;
        }
      }
    }

    // ── Y-AXIS MAGNETIC STICKY SNAP ──────────────────────────────────────────
    let yHandled = false;
    if (activeSnapYRef.current) {
      const { snapVal, offsetType } = activeSnapYRef.current;
      const currentPos = offsetType === 'top' ? y : offsetType === 'bottom' ? y + h : y + h / 2;
      const dist = Math.abs(currentPos - snapVal);

      if (dist < SNAP_STICKY_THRESHOLD) {
        dy = offsetType === 'top' ? snapVal - y : offsetType === 'bottom' ? snapVal - (y + h) : snapVal - (y + h / 2);
        guides.push({ y: snapVal });
        yHandled = true;
      } else {
        activeSnapYRef.current = null;
      }
    }

    if (!yHandled) {
      for (const sy of snapYCandidates) {
        if (Math.abs(y - sy) < SNAP_THRESHOLD) {
          dy = sy - y; guides.push({ y: sy });
          activeSnapYRef.current = { snapVal: sy, offsetType: 'top' };
          break;
        }
        if (Math.abs(y + h - sy) < SNAP_THRESHOLD) {
          dy = sy - (y + h); guides.push({ y: sy });
          activeSnapYRef.current = { snapVal: sy, offsetType: 'bottom' };
          break;
        }
        if (Math.abs(y + h / 2 - sy) < SNAP_THRESHOLD) {
          dy = sy - (y + h / 2); guides.push({ y: sy });
          activeSnapYRef.current = { snapVal: sy, offsetType: 'center' };
          break;
        }
      }
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
    setHudData({ x: nx, y: ny, w: widget.width, h: widget.height, rotation: widget.rotation, visible: true });
  }, [widgets, zoom, snapEnabled, updateWidget]);

  const handleDragEnd = useCallback(() => {
    activeSnapXRef.current = null;
    activeSnapYRef.current = null;
    setActiveGuides([]);
    pushHistory();
    useEditorStore.getState().setIsDragging(false);
    setTimeout(() => setHudData(prev => ({ ...prev, visible: false })), 150);
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
    const curRot = widgets.find(w => w.id === id)?.rotation ?? 0;
    updateWidget(id, { width: nw, height: nh, x: nx, y: ny });
    target.style.width = `${nw * zoom}px`;
    target.style.height = `${nh * zoom}px`;
    target.style.transform = `translate(${nx * zoom}px,${ny * zoom}px) rotate(${curRot}deg)`;
    setHudData({ x: nx, y: ny, w: nw, h: nh, rotation: curRot, visible: true });
  }, [zoom, updateWidget, widgets]);

  const handleResizeEnd = useCallback(() => {
    pushHistory();
    useEditorStore.getState().setIsResizing(false);
    setTimeout(() => setHudData(prev => ({ ...prev, visible: false })), 150);
  }, [pushHistory]);

  // Rotate handlers
  const handleRotate = useCallback((e: { target: SVGElement | HTMLElement; rotation: number; inputEvent?: any }) => {
    const target = e.target as HTMLElement;
    const id = target.dataset.id;
    if (!id) return;
    let rot = Math.round(e.rotation);
    if (e.inputEvent && e.inputEvent.shiftKey) {
      rot = Math.round(rot / 15) * 15;
    }
    updateWidget(id, { rotation: rot });
    const w = widgets.find(ww => ww.id === id)!;
    target.style.transform = `translate(${w.x * zoom}px,${w.y * zoom}px) rotate(${rot}deg)`;
    setHudData({ x: w.x, y: w.y, w: w.width, h: w.height, rotation: rot, visible: true });
  }, [widgets, zoom, updateWidget]);

  const handleRotateEnd = useCallback(() => {
    pushHistory();
    setTimeout(() => setHudData(prev => ({ ...prev, visible: false })), 150);
  }, [pushHistory]);

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

      {/* Canvas stage + scrollbars — always renders.
          Occupies grid cell (2,2) when rulers visible, otherwise (1,1). */}
      <div style={{ gridColumn: showRulers ? 2 : 1, gridRow: showRulers ? 2 : 1, position: 'relative', overflow: 'hidden' }}>
        <div
          className="canvas-wrapper vibe-canvas-bg"
          style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        >
            <div
              ref={stageRef}
              className={`canvas-stage ${gridMode === 'dots' ? 'grid-dots' : gridMode === 'lines' ? 'grid-lines' : 'grid-off'}`}
              style={{
                position: 'absolute',
                left: (viewport.w - stageW) / 2 + pan.x,
                top: (viewport.h - stageH) / 2 + pan.y,
                width: stageW,
                height: stageH,
                borderRadius: 20 * zoom,
                overflow: 'hidden',
                backgroundColor: '#0b0c10',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                ...(gridMode === 'lines'
                  ? {
                      backgroundImage: [
                        `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                        `linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                      ].join(','),
                      backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
                    }
                  : gridMode === 'dots'
                  ? {
                      backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 1.5px, transparent 0)`,
                      backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
                    }
                  : {}),
              }}
              data-canvas="true"
              onMouseDown={e => {
                if (e.target === stageRef.current) {
                  deselectAll();
                }
              }}
            >
              {/* Top-Left RECORDING badge matching screenshot */}
              <div style={{
                position: 'absolute',
                top: 18 * zoom,
                left: 20 * zoom,
                zIndex: 99,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6 * zoom,
                padding: `${4 * zoom}px ${10 * zoom}px`,
                borderRadius: 999,
                background: 'rgba(50, 10, 15, 0.85)',
                border: '1px solid rgba(255, 59, 48, 0.4)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                pointerEvents: 'none',
              }}>
                <span style={{ width: 6 * zoom, height: 6 * zoom, borderRadius: '50%', background: '#ff3b30', boxShadow: '0 0 6px #ff3b30' }} />
                <span style={{ fontSize: 9 * zoom, fontWeight: 800, color: '#ff4d4d', letterSpacing: '0.08em', fontFamily: 'var(--font-sans)' }}>
                  RECORDING
                </span>
              </div>
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

              {/* Unified SceneRenderer for widgets */}
              <SceneRenderer
                widgets={widgets}
                zoom={zoom}
                animated={false}
                interactive={true}
                selectedIds={selectedIds}
                hoveredId={hoveredId}
                isDragging={isDragging}
                isResizing={isResizing}
                onWidgetMouseEnter={setHovered}
                onWidgetMouseLeave={() => setHovered(null)}
                onWidgetMouseDown={(id, e) => {
                  selectWidget(id, e.shiftKey || e.metaKey || e.ctrlKey);
                }}
                onWidgetContextMenu={(id, e) => {
                  selectWidget(id);
                  setContextMenu({ x: e.clientX, y: e.clientY, widgetId: id });
                }}
                timerSource="preview"
              />

              {widgets.length === 0 && (
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 10,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 12, pointerEvents: 'none', userSelect: 'none',
                }}>
                  <div style={{
                    padding: '24px 36px', borderRadius: 16,
                    background: 'rgba(14,8,26,0.6)', border: '1.5px dashed var(--color-accent-alpha-40)',
                    backdropFilter: 'blur(8px)', textAlign: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    maxWidth: 420,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: 'var(--color-accent-subtle)', border: '1px solid var(--color-accent-alpha-20)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--color-accent)',
                    }}>
                      <Plus size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>
                        Canvas is Empty
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                        Drag widgets from the Left Panel onto the canvas, or double-click any widget item to add it to your scene.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Transition Studio live overlay preview */}
              <TransitionOverlay zoom={zoom} />

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
                    padding: '1px 4px',
                    borderRadius: 3,
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

          {/* Scrollbars overlay */}
          {rangeX > 0 && (
            <div className="scrollbar-h" style={{ left: 8, right: 24, width: 'calc(100% - 32px)' }}>
              <div
                className={`scrollbar-thumb${draggingScroll === 'h' ? ' dragging' : ''}`}
                onMouseDown={startDragScrollH}
                style={{
                  left: thumbLeft,
                  width: thumbW,
                  height: '100%',
                }}
              />
            </div>
          )}
          {rangeY > 0 && (
            <div className="scrollbar-v" style={{ top: 8, bottom: 24, height: 'calc(100% - 32px)' }}>
              <div
                className={`scrollbar-thumb${draggingScroll === 'v' ? ' dragging' : ''}`}
                onMouseDown={startDragScrollV}
                style={{
                  top: thumbTop,
                  height: thumbH,
                  width: '100%',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Moveable Bounding Box resize handlers */}
      {selectedWidgets.length > 0 && !selectedWidgets.some(w => w.locked) && (
        <Moveable
          key={selectedIds.join(',')}
          ref={moveableRef}
          target={selectedWidgets.map(w => stageRef.current?.querySelector(`[data-id="${w.id}"]`) as HTMLElement).filter(Boolean)}
          container={canvasAreaRef.current}
          draggable
          resizable
          rotatable
          snappable={snapEnabled}
          snapThreshold={SNAP_STICKY_THRESHOLD * zoom}
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

      {/* Live Transform HUD */}
      {hudData.visible && (
        <div
          style={{
            position: 'absolute',
            top: Math.max(10, hudData.y * zoom + pan.y - 34),
            left: Math.max(10, hudData.x * zoom + pan.x),
            zIndex: 99999,
            background: 'var(--surface-5, #1e1b2e)',
            border: '1px solid var(--color-accent)',
            borderRadius: 6,
            padding: '3px 8px',
            fontSize: 10,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: '#ffffff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <span>X: {hudData.x}px</span>
          <span>Y: {hudData.y}px</span>
          <span>W: {hudData.w}px</span>
          <span>H: {hudData.h}px</span>
          {hudData.rotation !== 0 && <span style={{ color: 'var(--color-accent)' }}>{hudData.rotation}°</span>}
        </div>
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
