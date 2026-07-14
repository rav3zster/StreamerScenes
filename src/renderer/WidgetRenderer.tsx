/**
 * WidgetRenderer.tsx — Registry-based Widget Renderer
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the single entry-point for rendering any SceneWidget.
 * It resolves the correct component from the registry and delegates rendering.
 *
 * Both EditorCanvas and OutputPage use this component — it is the shared
 * rendering unit that guarantees preview and output are pixel-identical.
 */

import React from 'react';
import type { SceneWidget } from '../store/editorStore';
import { resolveWidget } from '../widgets/registry';
import { buildAnimationStyle } from './animationHelpers';

interface WidgetRendererProps {
  widget: SceneWidget;
  zoom: number;
  /**
   * When true (output mode): CSS animations play, placeholders are hidden.
   * When false (editor mode): animations are suppressed, placeholders visible.
   */
  animated: boolean;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = React.memo(
  ({ widget, zoom, animated }) => {
    const Component = resolveWidget(widget.type);

    // Apply animation as a wrapper style so the widget component itself
    // doesn't need to concern itself with animation timing.
    const animationStyle = buildAnimationStyle(widget.animation, animated);

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          ...animationStyle,
        }}
      >
        <Component widget={widget} zoom={zoom} animated={animated} />
      </div>
    );
  },
  // Custom memo comparison: only re-render when widget data or context changes
  (prev, next) =>
    prev.zoom === next.zoom &&
    prev.animated === next.animated &&
    prev.widget === next.widget
);

WidgetRenderer.displayName = 'WidgetRenderer';
