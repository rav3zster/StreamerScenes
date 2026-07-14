import React from 'react';
import { WidgetRenderer as SharedWidgetRenderer } from '../../renderer/WidgetRenderer';
import type { SceneWidget } from '../../store/editorStore';

interface Props {
  widget: SceneWidget;
  zoom: number;
}

/**
 * @deprecated Use WidgetRenderer from src/renderer/WidgetRenderer instead.
 * Forwarding legacy imports to the new registry-based implementation.
 */
export const WidgetRenderer: React.FC<Props> = ({ widget, zoom }) => {
  return <SharedWidgetRenderer widget={widget} zoom={zoom} animated={false} />;
};
