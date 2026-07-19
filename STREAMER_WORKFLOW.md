# Streamer Workflow

## Overview

VibeOverlay Studio now includes five new features that transform it from an editing tool into a complete streaming overlay management experience. This document describes how each feature works from the streamer's perspective.

## 1. New Stream Wizard

**Entry point:** First visit to the app (or anytime via File > New Stream)

The wizard guides new users through five steps:

1. **Welcome** — Brief intro with feature highlights and a "Get Started" button
2. **Pack Selection** — Choose a pre-built overlay pack from the library
3. **Personalize** — Enter streamer name, channel name, upload logo/avatar, add social links, configure countdown duration, and select a camera frame
4. **Theme Review** — Preview the selected pack with personalization applied; adjust theme colors
5. **Finish** — Final confirmation and "Create Project" button that applies everything and lands in the editor

**State:** Isolated in `wizardStore.ts` — does not touch `editorStore` until "Finish" is clicked.

## 2. Asset Personalization

**Location:** Wizard Step 3 and automated by `placeholderReplacer.ts`

When the user clicks "Finish" in the wizard, `createProjectFromPack()` is called, which:
- Loads the selected pack
- Runs `replacePlaceholders()` on every widget's content
- Replaces `{STREAMER_NAME}`, `{CHANNEL_NAME}`, `{LOGO_URL}`, `{AVATAR_URL}`, social links, camera frame, and countdown duration
- Sets the resulting scenes into `editorStore`
- Navigates to the editor

**Also available:** Users can manually edit any text widget in the editor to use `{STREAMER_NAME}` and `{CHANNEL_NAME}` placeholders.

## 3. Theme Manager

**Location:** Editor > Left Panel > Themes tab

The Theme Manager panel allows:
- **Accent color** — Primary brand color used for buttons, highlights, and active elements
- **Background color** — Overlay background tint
- **Text color** — Override default text color
- **Border radius** — Global rounding (0–24px slider)
- **Glass intensity** — Backdrop blur strength for glass-morphism widgets (0–100% slider)
- **Animation toggle** — Enable/disable animated elements globally
- **Transition style** — Fade, slide, or none

**Reset:** A "Reset Theme" button restores all values to null (pack defaults).

**Persistence:** Theme overrides are saved as part of the project and restore on reload.

## 4. OBS Setup Guide

**Entry points:** File menu > "OBS Setup Guide" or directly in the guide page

The guide provides:
- Step-by-step OBS configuration instructions (add Browser Source, set URL, width/height, etc.)
- A "Copy URL" button for the overlay output page
- Recommended settings display (1920x1080, 60 FPS, custom CSS for transparent background)
- An "Open Output Page" link to preview the overlay in a browser

## 5. Stream Readiness Checklist

**Location:** Bottom status bar (right side) — shows `X/9` indicator

Click the counter to open the checklist popover. Items:
1. Pack Selected
2. Logo Added
3. Username Added
4. Social Links Added
5. Countdown Configured
6. Project Created
7. OBS Connected (manual — click to mark complete)
8. Browser Source Verified (manual — click to mark complete)
9. Theme Applied

When all items are checked, a red "Ready to Go Live" banner appears with a pulsing live indicator.

**Manual checks:** Items 7–8 are user-affirmed (the store cannot detect OBS connection or browser source verification programmatically).

## Architecture

- All new state is isolated: wizard state in `wizardStore.ts`, readiness checks in `editorStore`, theme overrides in `editorStore`.
- No new external dependencies.
- All new CSS follows the existing design system in `src/index.css`.
- Placeholder replacement is purely string-based — no DOM manipulation.
