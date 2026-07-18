/**
 * SceneRenderer.tsx — Shared Scene Rendering Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the single, canonical renderer for a list of SceneWidgets.
 *
 * It is used by:
 *   • EditorCanvas  — for the live widget layer inside the editor
 *   • TopToolbar    — for the PreviewCanvas in preview mode
 *   • OutputPage    — for the OBS Browser Source output
 *
 * All three contexts must produce identical visual output.
 * The only difference is the `animated` flag (false in editor, true in output).
 */

import React, { useEffect } from 'react';
import type { SceneWidget } from '../store/editorStore';
import { WidgetRenderer } from './WidgetRenderer';
import { injectAnimationKeyframes } from './animationHelpers';
import { CANVAS_W, CANVAS_H } from '../editor/canvas/EditorCanvas';

export interface SceneRendererProps {
  /** The widgets to render, in any order (sorted by zIndex internally). */
  widgets: SceneWidget[];

  /**
   * Current zoom / scale factor.
   * 1.0 = 100% (OBS output or native size).
   * Widgets must multiply all pixel values by this factor.
   */
  zoom: number;

  /**
   * When true: CSS animations play, placeholder overlays are hidden.
   * Use true for OutputPage and PreviewCanvas.
   * Use false for the editor canvas layer.
   */
  animated?: boolean;

  /**
   * Optional canvas dimensions. Defaults to CANVAS_W × CANVAS_H.
   * Used only for the root container when rendering in a fixed-size context.
   */
  canvasWidth?: number;
  canvasHeight?: number;

  timerSource?: 'live' | 'preview';

  // Interactive/Editor mode props
  interactive?: boolean;
  selectedIds?: string[];
  hoveredId?: string | null;
  isDragging?: boolean;
  isResizing?: boolean;
  onWidgetMouseEnter?: (id: string) => void;
  onWidgetMouseLeave?: () => void;
  onWidgetMouseDown?: (id: string, e: React.MouseEvent) => void;
  onWidgetContextMenu?: (id: string, e: React.MouseEvent) => void;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  widgets,
  zoom,
  animated = false,
  canvasWidth = CANVAS_W,
  canvasHeight = CANVAS_H,
  timerSource = 'preview',
  interactive = false,
  selectedIds = [],
  hoveredId = null,
  isDragging = false,
  isResizing = false,
  onWidgetMouseEnter,
  onWidgetMouseLeave,
  onWidgetMouseDown,
  onWidgetContextMenu,
}) => {
  // Inject CSS keyframes once when this renderer first mounts.
  useEffect(() => {
    injectAnimationKeyframes();
  }, []);

  const sorted = [...widgets].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <>
      {sorted.map(w => {
        // In editor, we still want to render invisible widgets so they can be selected,
        // but with opacity 0. In live/preview display mode, we hide them entirely.
        if (!w.visible && !interactive) return null;

        const isSelected = selectedIds.includes(w.id);
        const isHovered = hoveredId === w.id && !isSelected;

        const className = interactive
          ? [
              'canvas-widget',
              isSelected ? 'selected' : '',
              isHovered ? 'hovered' : '',
              w.locked ? 'locked' : '',
            ].join(' ')
          : undefined;

        // Position styles must match exactly between editor and OBS Output for visual fidelity.
        // We use translate layout and transform-origin top left which aligns with the Moveable logic.
        const containerStyle: React.CSSProperties = interactive
          ? {
              position: 'absolute',
              left: 0,
              top: 0,
              width: w.width * zoom,
              height: w.height * zoom,
              transform: `translate(${w.x * zoom}px, ${w.y * zoom}px) rotate(${w.rotation}deg)`,
              opacity: w.visible ? w.opacity / 100 : 0,
              zIndex: w.zIndex,
              transformOrigin: 'top left',
              pointerEvents: w.locked ? 'none' : 'all',
            }
          : {
              position: 'absolute',
              left: 0,
              top: 0,
              width: w.width * zoom,
              height: w.height * zoom,
              transform: `translate(${w.x * zoom}px, ${w.y * zoom}px) rotate(${w.rotation}deg)`,
              transformOrigin: 'top left',
              opacity: w.opacity / 100,
              zIndex: w.zIndex,
              pointerEvents: 'none',
              overflow: 'hidden',
            };

        return (
          <div
            key={w.id}
            data-id={interactive ? w.id : undefined}
            data-widget-id={w.id}
            data-widget-type={w.type}
            className={className}
            style={containerStyle}
            onMouseEnter={interactive ? () => onWidgetMouseEnter?.(w.id) : undefined}
            onMouseLeave={interactive ? onWidgetMouseLeave : undefined}
            onMouseDown={interactive ? (e) => {
              if (w.locked) return;
              onWidgetMouseDown?.(w.id, e);
            } : undefined}
            onContextMenu={interactive ? (e) => {
              onWidgetContextMenu?.(w.id, e);
            } : undefined}
          >
            <div style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              borderRadius: w.style?.borderRadius ? `${w.style.borderRadius * zoom}px` : 0,
            }}>
              <WidgetRenderer widget={w} zoom={zoom} animated={!!animated} timerSource={timerSource} />
            </div>

            {/* Bounding dimensions badge (Figma style) */}
            {interactive && isSelected && (isDragging || isResizing) && (
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
                {Math.round(w.width)} × {Math.round(w.height)}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

SceneRenderer.displayName = 'SceneRenderer';
