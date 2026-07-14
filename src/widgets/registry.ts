/**
 * registry.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Maps every WidgetType to its isolated React renderer component.
 *
 * To add a new widget type:
 *   1. Create a component in the appropriate sub-folder
 *   2. Add one entry to WIDGET_REGISTRY below
 *   3. Add the type to WidgetType in editorStore.ts
 *
 * No other files need to change.
 */

import type { WidgetType } from '../store/editorStore';
import type { WidgetProps } from './types';
import type React from 'react';

// ── Layout ──────────────────────────────────────────────────────────────────
import { BackgroundWidget }      from './layout/BackgroundWidget';
import { HeaderWidget }          from './layout/HeaderWidget';
import { FooterWidget }          from './layout/FooterWidget';
import { SidebarWidget }         from './layout/SidebarWidget';
import { ContainerWidget }       from './layout/ContainerWidget';
import { GlassPanelWidget }      from './layout/GlassPanelWidget';
import { DividerWidget }         from './layout/DividerWidget';
import { SpacerWidget }          from './layout/SpacerWidget';

// ── Text ────────────────────────────────────────────────────────────────────
import { TextWidget }            from './text/TextWidget';
import { ScrollingTextWidget }   from './text/ScrollingTextWidget';
import { CountdownWidget }       from './text/CountdownWidget';
import { ClockWidget }           from './text/ClockWidget';
import { ViewerCountWidget }     from './text/ViewerCountWidget';
import { LatestEventWidget }     from './text/LatestEventWidget';
import { GoalWidget }            from './text/GoalWidget';
import { SocialLinksWidget }     from './text/SocialLinksWidget';

// ── Media ───────────────────────────────────────────────────────────────────
import { ImageWidget }           from './media/ImageWidget';
import { VideoWidget }           from './media/VideoWidget';
import { CameraWidget }          from './media/CameraWidget';
import { AvatarWidget }          from './media/AvatarWidget';
import { LogoWidget }            from './media/LogoWidget';
import { PlaceholderMediaWidget } from './media/PlaceholderMediaWidget';

// ── Stream ──────────────────────────────────────────────────────────────────
import { ChatBoxWidget }         from './stream/ChatBoxWidget';
import { EventListWidget }       from './stream/EventListWidget';
import { AlertsWidget }          from './stream/AlertsWidget';
import { SpotifyWidget }         from './stream/SpotifyWidget';
import { PollWidget }            from './stream/PollWidget';

// ── Shapes ──────────────────────────────────────────────────────────────────
import { ShapeWidget }           from './shapes/ShapeWidget';
import { NeonCardWidget }        from './shapes/NeonCardWidget';
import { BadgeWidget }           from './shapes/BadgeWidget';

// ── Fallback ────────────────────────────────────────────────────────────────
import { FallbackWidget }        from './FallbackWidget';

// ─── Registry Map ─────────────────────────────────────────────────────────────

export const WIDGET_REGISTRY: Partial<Record<WidgetType, React.FC<WidgetProps>>> = {
  // Layout
  background:      BackgroundWidget,
  header:          HeaderWidget,
  footer:          FooterWidget,
  sidebar:         SidebarWidget,
  container:       ContainerWidget,
  'glass-panel':   GlassPanelWidget,
  divider:         DividerWidget,
  spacer:          SpacerWidget,

  // Text
  text:               TextWidget,
  'animated-text':    TextWidget,
  'typing-text':      TextWidget,
  'now-playing-text': TextWidget,
  'scrolling-text':   ScrollingTextWidget,
  'countdown-timer':  CountdownWidget,
  clock:              ClockWidget,
  'viewer-count':     ViewerCountWidget,
  'latest-follower':  LatestEventWidget,
  'latest-subscriber':LatestEventWidget,
  'latest-donation':  LatestEventWidget,
  'goal-counter':     GoalWidget,
  'goal-bar':         GoalWidget,
  'social-links':     SocialLinksWidget,

  // Media
  image:           ImageWidget,
  gif:             ImageWidget,
  video:           VideoWidget,
  'game-capture':  VideoWidget,
  'camera-frame':  CameraWidget,
  'avatar-frame':  AvatarWidget,
  logo:            LogoWidget,
  lottie:          PlaceholderMediaWidget,
  svg:             PlaceholderMediaWidget,
  vtuber:          PlaceholderMediaWidget,

  // Stream
  'chat-box':       ChatBoxWidget,
  'event-list':     EventListWidget,
  'donation-feed':  EventListWidget,
  'follower-feed':  EventListWidget,
  'subscriber-feed':EventListWidget,
  alerts:           AlertsWidget,
  spotify:          SpotifyWidget,
  poll:             PollWidget,

  // Shapes
  shape:              ShapeWidget,
  line:               ShapeWidget,
  'glow-effect':      ShapeWidget,
  particles:          ShapeWidget,
  'corner-decoration':ShapeWidget,
  'neon-card':        NeonCardWidget,
  'glass-card':       NeonCardWidget,
  badge:              BadgeWidget,
};

/**
 * Resolves a widget component from the registry.
 * Always returns a valid component — falls back to FallbackWidget for unknowns.
 */
export function resolveWidget(type: WidgetType): React.FC<WidgetProps> {
  return WIDGET_REGISTRY[type] ?? FallbackWidget;
}
