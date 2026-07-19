# VibeOverlay Studio — Broadcast Runtime

> Defines the behavior of the Live Runtime once a stream begins.
> This document complements `ARCHITECTURE.md`.
> It does not redefine Draft/Live architecture—it defines how the runtime behaves after a scene becomes Live.

---

# Philosophy

The Broadcast Runtime is responsible for everything the viewer sees.

It is **not** an editor.

It is **not** the project manager.

It is **not** responsible for layouts.

Its only responsibility is:

> Render the current Live Scene reliably, smoothly and predictably.

Every runtime decision should prioritize:

- Stability
- Low latency
- Predictability
- Smooth transitions
- Zero accidental edits

---

# Runtime Pipeline

```
Editor (Draft)

↓

Preview

↓

Go Live

↓

Live Runtime

↓

Output Renderer

↓

OBS Browser Source
```

Only the Live Runtime can affect the Output Renderer.

The Editor can never directly modify the live stream.

---

# Runtime Responsibilities

The Broadcast Runtime owns:

- Current Live Scene
- Scene transitions
- Timer Runtime
- Widget lifecycle
- Runtime animations
- Live scene state
- Transition execution

The runtime does NOT own:

- Editing
- Selection
- Dragging
- Inspector
- Layers panel
- Asset management

---

# Scene Lifecycle

Every Scene exists in one of four states.

```
Draft

↓

Preview

↓

Live

↓

Inactive
```

Only one Scene may be Live at any time.

---

# Scene Activation

When a scene becomes Live:

1. Deep clone Draft into Live
2. Scene becomes immutable
3. Runtime starts
4. Widgets receive activation event
5. Transition begins
6. OBS updates

No editing state should carry over.

---

# Scene Deactivation

When another scene becomes Live:

Current Scene receives:

```
onSceneDeactivated()
```

Runtime decides:

- stop timers
- pause timers
- keep timers alive

depending on widget configuration.

---

# Go Live

When the user presses:

```
Go Live
```

The runtime should:

1. Clone Draft Scene
2. Publish to Live Store
3. Begin Transition
4. Notify Widgets
5. Render Output

No browser refresh.

No page reload.

No new browser window.

The existing Output page simply updates.

---

# Preview

Preview is NOT Live.

Preview simulates:

- transitions
- timers
- animations
- widget behavior

without affecting OBS.

Everything shown in Preview must match Live rendering.

---

# Output Renderer

The Output Renderer should always render:

```
One Scene

+

Optional Transition Layer
```

Never:

- Draft
- Multiple Live Scenes
- Editor

Only one active scene may exist.

During transitions a temporary transition layer may be rendered.

After transition completes:

Previous Scene is unmounted.

---

# Widget Lifecycle

Every runtime widget follows the same lifecycle.

```
initialize()

↓

sceneActivated()

↓

running()

↓

sceneDeactivated()

↓

dispose()
```

Optional callbacks:

```
onTimerStarted()

onTimerPaused()

onTimerFinished()

onSceneActivated()

onSceneDeactivated()

onVisibilityChanged()

dispose()
```

Widgets should never manage global runtime.

They react to runtime events.

---

# Timer Runtime

The Timer Runtime is the single source of truth.

Widgets never own timer state.

```
Timer Runtime

↓

Countdown Widget

↓

Progress Ring

↓

Remaining Time Text

↓

Future Timer Widgets
```

Every timer widget connected to the same runtime displays identical values.

---

# Multiple Timers

Each timer owns:

```
layerId

↓

TimerRuntime
```

Different scenes may contain multiple timers.

The Live Control Panel chooses which timer to control.

```
◀

Timer 2

Pomodoro

25:00

▶
```

Changing scenes automatically changes the available timers.

---

# Timer Start Policy

Each timer has:

```
Auto Start

ON / OFF
```

If ON

Timer starts immediately when scene goes Live.

If OFF

Timer waits until user presses Start.

---

# Timer Finish Behavior

Supported modes:

```
Freeze

Replace Text

Hide

Switch Scene
```

Replace Text supports:

- Fade
- Slide
- Zoom

Future modes:

- Play Sound
- Execute Macro

(documented only)

---

# Scene Transition

When switching scenes:

```
Current Scene

↓

Transition

↓

Next Scene
```

Supported V1 transitions:

- None
- Fade
- Slide

Future:

- Blur
- Zoom
- Glitch
- Pixel
- CRT

---

# Widget Runtime Policies

Every widget defines runtime behavior.

Example:

Video Widget

```
Restart

Resume

Pause

Loop
```

GIF

```
Restart

Continue
```

Lottie

```
Restart

Continue

Loop
```

Timer

```
Restart

Resume

Freeze
```

Music

```
Continue

Pause

Mute
```

These are widget configuration options.

---

# Live Control Panel

The Live Control Panel controls runtime only.

Never editing.

Available controls:

- Current Live Scene
- Scene Switcher
- Timer Controls
- Transition
- Runtime Status

Timer controls:

- +30s
- +1m
- +5m
- +10m
- -30s
- -1m
- Pause
- Resume
- Reset

Changes affect Live immediately.

---

# Runtime Events

Supported runtime events:

```
SceneActivated

SceneDeactivated

TimerStarted

TimerPaused

TimerFinished

TransitionStarted

TransitionFinished

WidgetLoaded

WidgetDisposed
```

Widgets subscribe only to events they need.

---

# Performance Rules

The runtime must prioritize stability.

Rules:

- One active Live Scene
- Shared SceneRenderer
- No unnecessary re-renders
- No editor components
- No Moveable
- No Inspector
- No selection
- No layout calculations
- No editing history

Output should remain lightweight.

---

# Failure Recovery

If Output refreshes:

1. Read Live Store
2. Restore Runtime
3. Continue rendering

If Editor closes:

Output continues displaying current Live Scene.

If OBS refreshes:

Runtime restores from persisted Live Store.

The stream should never disappear because the editor closes.

---

# Future Runtime Extensions

Not part of V1:

- Android Remote
- Stream Deck integration
- OBS WebSocket control
- Macro Engine
- Automation Rules
- Multi-user collaboration
- Remote cloud control
- Multi-output broadcasting

The current runtime should be designed so these can be added later without changing the existing lifecycle.

---

# Runtime Principles

The Broadcast Runtime exists to ensure that the stream behaves like professional broadcast software.

The viewer should never notice:

- editor activity
- scene preparation
- timer edits
- asset loading
- widget initialization

Every change should appear intentional, smooth and reliable.

The runtime should always prioritize broadcast quality over editing convenience.