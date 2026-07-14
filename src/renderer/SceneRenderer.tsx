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
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  widgets,
  zoom,
  animated = false,
  canvasWidth = CANVAS_W,
  canvasHeight = CANVAS_H,
}) => {
  // Inject CSS keyframes once when this renderer first mounts.
  useEffect(() => {
    injectAnimationKeyframes();
  }, []);

  const sorted = [...widgets].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <>
      {sorted.map(w => {
        if (!w.visible) return null;

        return (
          <div
            key={w.id}
            data-widget-id={w.id}
            data-widget-type={w.type}
            style={{
              position: 'absolute',
              left:   w.x * zoom,
              top:    w.y * zoom,
              width:  w.width  * zoom,
              height: w.height * zoom,
              transform:       `rotate(${w.rotation}deg)`,
              transformOrigin: 'center center',
              opacity:         w.opacity / 100,
              zIndex:          w.zIndex,
              overflow:        'hidden',
              pointerEvents:   'none',   // SceneRenderer is display-only; editor chrome handles interaction
            }}
          >
            <WidgetRenderer widget={w} zoom={zoom} animated={!!animated} />
          </div>
        );
      })}
    </>
  );
};

SceneRenderer.displayName = 'SceneRenderer';
