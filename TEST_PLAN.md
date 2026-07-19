# VibeOverlay Studio — Milestone 2 Widget Test Plan

This manual QA checklist defines the verification criteria for every widget in VibeOverlay Studio. Ensure each widget passes all check boxes before completing the milestone.

---

## 1. Priority 1 Widgets

### Text Widget (`text`, `animated-text`, `typing-text`, `now-playing-text`)
- [ ] **Create**: Add a new text widget, confirm default text renders.
- [ ] **Drag & Position**: Move it on the canvas, check snapping.
- [ ] **Resize**: Expand/shrink limits, verify text boundaries adjust.
- [ ] **Rotate**: Rotate, confirm bounding boxes match rotation.
- [ ] **Layer Ordering**: Send back/forward, verify correct overlapping.
- [ ] **Lock/Hide**: Lock editing, toggle visibility off, verify status.
- [ ] **Properties Editing**: Change font size, weight, text alignment, and typography in Right Panel.
- [ ] **Theme**: Check colors adapt cleanly in light/dark editor mode.
- [ ] **Preview Mode**: Verify typing animations and font effects run.
- [ ] **Output Renderer**: Confirm text renders exactly as styled.
- [ ] **Publish**: Switch to Live, verify overlay renders new text.
- [ ] **Persistence**: Refresh and confirm state remains.
- [ ] **Undo/Redo**: Modify text settings, verify Ctrl+Z/Y revert/re-apply edits.
- [ ] **Runtime typing**: In Preview/Output, `typing-text` types characters sequentially.

### Image & GIF Widget (`image`, `gif`)
- [ ] **Create**: Add an image widget, verify placeholder renders.
- [ ] **Upload/Remote URL**: Update URL to an online png/jpeg/gif, verify rendering.
- [ ] **Drag & Resize**: Move and scale, checking aspect ratio / object-fit scaling.
- [ ] **Properties Editing**: Adjust border radius, border width, border color, shadow blur, and opacity.
- [ ] **Preview/Output**: Verify GIFs animate in both mode frames.
- [ ] **GIF Restart runtime**: Verify GIF restarts playback from frame 0 upon scene activation (if policy set to 'restart').
- [ ] **Publish & Persist**: Switch to Live, verify OBS output gets updated, refresh page, check persistence.
- [ ] **Undo/Redo**: Undo/Redo URL updates and style modifications.

### Video Widget (`video`, `game-capture`)
- [ ] **Create**: Add a video widget, see default placeholder.
- [ ] **Remote URL**: Set URL to a raw MP4 stream, verify loading.
- [ ] **Drag & Resize**: Scale layout, inspect object-fit settings.
- [ ] **Mute/Loop Controls**: Toggle muted status and looping options in Right Panel.
- [ ] **Playback Policies**: Test `playPolicy` setting (Restart vs. Resume vs. Pause) when switching scenes.
- [ ] **Preview & Output**: Verify play/pause state is synchronized.
- [ ] **Publish & Undo**: Verify published output behaves identically, and undo/redo restores settings.

### SVG Widget (`svg`)
- [ ] **Create**: Add an SVG widget, see default placeholder.
- [ ] **Source Types**: Toggle source type between "Remote URL" and "Raw XML".
- [ ] **Remote URL**: Load remote `.svg` file, verify correct scaling.
- [ ] **Raw XML**: Paste custom SVG markup code, verify rendering in canvas.
- [ ] **Drag & Resize**: Move, scale, and check aspect ratio.
- [ ] **Publish & Persist**: Verify it is saved, restored, and renders properly in OBS.

---

## 2. Priority 2 Widgets

### Countdown Widget (`countdown-timer`)
- [ ] **Create**: Add countdown widget, verify layout.
- [ ] **Duration edit**: Change timer limit (e.g. 300s), check display update.
- [ ] **Finish Behavior**: Set behavior (Freeze, Replace Text, Switch Scene) and target parameters.
- [ ] **Timer Controls**: Pause, Resume, Reset, and adjust time (+1m, -30s) in Live Control Panel.
- [ ] **Preview/Output**: Check sync ticks and transition events on finish.
- [ ] **Publish & Persist**: Ensure state is preserved across reloads.

### Clock Widget (`clock`)
- [ ] **Create**: Add clock, confirm ticks every second.
- [ ] **Format toggle**: Toggle between 12-hour (AM/PM) and 24-hour display format.
- [ ] **Seconds toggle**: Hide seconds readout, verify format shifts.
- [ ] **TimeZone offset**: Input timezone overrides (optional), confirm offsets.
- [ ] **Preview & Output**: Verify identical time and ticks.
- [ ] **Undo/Redo**: Change clock configurations, check history command.

### Header & Footer (`header`, `footer`)
- [ ] **Create**: Add header or footer, verify default layout.
- [ ] **Title Text**: Customize title text settings in Right Panel, confirm visual update.
- [ ] **Styles**: Edit padding, font size, text color, and border outlines.
- [ ] **Publish & Output**: Verify published header/footer matches editor styling.

### Divider (`divider`)
- [ ] **Create**: Add divider line.
- [ ] **Resize**: Scale width/height to make horizontal/vertical rules.
- [ ] **Style Options**: Adjust colors, borders, and transparency.

### Container & Glass Panel (`container`, `glass-panel`)
- [ ] **Create**: Add container or glass panel, check layout bounds.
- [ ] **Backdrop effects**: Enable/disable Glass Backdrop effect, slide blur depth, and border glow.
- [ ] **Text Label**: Input optional label text, verify alignment and typography controls.
- [ ] **Publish & Undo**: Publish and verify identical glass styling, test undo styles.

---

## 3. Priority 3 Widgets

### Lottie Widget (`lottie`)
- [ ] **Create**: Add Lottie widget, verify placeholder.
- [ ] **JSON URL**: Input Lottie JSON link, verify animation loads and ticks.
- [ ] **Loop & Autoplay**: Toggle loops and auto-play status, inspect runtime playback.
- [ ] **Preview & Output**: Verify identical render of animations.
- [ ] **Publish & Persist**: Verify it is saved, restored, and rendered in OBS.

### Music Player (`spotify` - Dummy Provider)
- [ ] **Create**: Add music widget, see chill synthwave defaults.
- [ ] **Properties Edit**: Change Track Title and Artist Name in Right Panel.
- [ ] **Theme**: Check layout with synth/glass styles.
- [ ] **Publish & Persist**: Verify it syncs with Output screen.

### Chat Box (`chat-box`)
- [ ] **Create**: Add chat box, verify mock messages list.
- [ ] **Max Messages**: Adjust limits in Right Panel (e.g. limit to 3), verify list truncates.
- [ ] **Live Simulation**: In Preview/Output mode (animated=true), verify new mock messages scroll up at random intervals.
- [ ] **Publish**: Verify OBS chat simulation.

### Social Links (`social-links`)
- [ ] **Create**: Add social links widget.
- [ ] **Platform handles**: Input Twitch, Twitter, YouTube, and Discord handles in Right Panel.
- [ ] **Empty platform**: Clear a handle, verify its icon disappears from the list.
- [ ] **Typography**: Adjust text style / font weight.
- [ ] **Publish**: Confirm live row matching.

### Decorations (`shape`, `line`, `glow-effect`, `particles`, `corner-decoration`, `badge`)
- [ ] **Create**: Add shapes, lines, glows, or corner marks.
- [ ] **Properties**: Verify custom color gradient, blur depth, border size.
- [ ] **Theme & Publish**: Verify identical visual output in live screen.

---

## 4. Milestone 3 — Broadcast Packs & Template System

### Onboarding & Browser Flow
- [ ] **Onboarding Screen UI**: Run the app without existing project data, confirm the Welcome Wizard appears with pack list, details, and layout previews.
- [ ] **Category Filtering**: Click categories (All, Cyberpunk, Gaming, Luxury, Minimal, Lo-Fi, Anime, Cozy) in the Pack Browser, verify the grid filters instantly.
- [ ] **Pack Search**: Type query strings in the search bar, verify filter updates and case-insensitivity.

### Preview System
- [ ] **Preview Scene Selection**: Select different scenes (Starting Soon, Just Chatting, Gameplay, Ending) in the Pack Details / Welcome Wizard tabs, check if the preview mini-canvas updates layouts instantly.
- [ ] **Non-Modifying Previews**: Verify that switching packs or scenes inside the preview canvas does NOT modify any active project state in the store.

### Import / Export System
- [ ] **Pack Loader**: Select a pack, input a custom project name, and click **Use This Pack** / **Create Project & Import Pack**. Confirm the app navigates to the Editor Workspace with all scenes, widgets, and layouts fully built.
- [ ] **Custom Settings Customization**: Modify widget settings in the imported project, confirm changes save to persistence.
- [ ] **JSON Project Export**: Click **Export Project (.json)** in the File menu, verify JSON file downloads.
- [ ] **JSON Project Import**: Import a previously exported JSON project file, verify all scenes, styles, and custom widgets load correctly.

### Theme & Typography Swap
- [ ] **Theme Variable Injections**: Confirm that when importing the `Luxury Noir` pack, Playfair Display serif fonts render cleanly. Confirm that when importing `Cyber Neon` or `Streamer Bedroom`, neon glow styles apply.
- [ ] **Reload / Refresh Retention**: Refresh the editor page, verify that the active visual pack theme variables (`theme-...` class list on `.app-shell`) remain active.

---

## 5. Maintainability & UX Refinements

### Pack Modularization (Part 1)
- [ ] **Pack Registry Import**: Verify that all 8 broadcast packs load in the Pack Browser.
- [ ] **Clean Compilation**: Confirm the bundle compiles without errors, showing all packs are registered.
- [ ] **Functional Identity**: Import a pack (e.g. Esports), verify all scenes and coordinates load identically to the pre-refactor version.

### UX Polish (Part 2)
- [ ] **Moveable Resizer Handles Style**: Select any widget, confirm the bounding box borders match the accent color, and resize handles are round circles with hover animations.
- [ ] **Moveable Rotation Handle Style**: Confirm the rotation handle is hot pink to differentiate it from size controls.
- [ ] **Auto-save Indicators**: Make a change (e.g. drag a widget), check that the Bottom Status Bar immediately displays a yellow dot and "Saving...".
- [ ] **Auto-save Finished Status**: Wait 2 seconds, verify the indicator changes to a green dot and lists the correct saved timestamp (e.g. "Saved 05:24:12 PM").

### Performance (Part 3)
- [ ] **Scene Rendering Optimization**: Verify that zooming/panning/dragging remains smooth. Confirm that resizing widgets renders without lags or visual stuttering.
