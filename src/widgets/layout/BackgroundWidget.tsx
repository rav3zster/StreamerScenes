import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

export const BackgroundWidget: React.FC<WidgetProps> = ({ widget }) => (
  <div style={buildBaseStyle(widget.style)} />
);
