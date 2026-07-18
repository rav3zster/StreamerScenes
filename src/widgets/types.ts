/**
 * types.ts — Widget Renderer Props
 * ─────────────────────────────────────────────────────────────────────────────
 * Defines the universal interface that every widget renderer component must
 * conform to. This is the single contract between the renderer pipeline and
 * the individual widget implementations.
 */

import type { SceneWidget } from '../store/editorStore';

export interface WidgetProps {
  /**
   * The full widget data object from the store.
   */
  widget: SceneWidget;

  /**
   * Current canvas zoom level (0.1–4.0).
   * Widget components must scale all pixel values by this factor so
   * they look identical at every zoom level.
   */
  zoom: number;

  /**
   * When true, the widget is rendering in the final output (OBS) context:
   * - CSS animations are active
   * - No placeholder overlays
   * - No dashed-border "drop zone" styling
   * When false (editor preview), animations are suppressed and
   * placeholder labels are shown for non-visual widgets.
   */
  animated: boolean;
  timerSource?: 'live' | 'preview';
}
