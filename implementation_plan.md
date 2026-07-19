# Implementation Plan — V0.6 Milestone 4: Streamer Experience

## Architecture Principles

- **No redesign of core systems.** The existing Zustand store, pack system, renderer pipeline, widget registry, and CSS theme system remain unchanged.
- **No cloud, desktop (Tauri), Spotify, marketplace, AI, or plugin features.**
- **All new state** goes into the existing `editorStore.ts` (extending the store shape, not replacing it).
- **All new CSS** follows the existing design system in `src/index.css`.
- **New components** follow the existing patterns in `src/pages/`, `src/editor/panels/`, etc.

---

## Part 1 — New Stream Wizard (5 Steps)

### Step 1: Welcome

**What changes:**
- Replace `WelcomePage.tsx` content to be the wizard step 1.
- Keep the brand hero, but add two primary CTAs:
  - **"Create New Stream"** → advances to Step 2 (Choose Style)
  - **"Open Existing Project"** → loads saved project (existing behavior)
- Remove redundant "New Project" card (it currently navigates to same place as Browse Packs).

**Files affected:**
- `src/pages/WelcomePage.tsx` — rewrite content
- `src/store/editorStore.ts` — add `wizardStep` state, possibly a `WizardStep` type

### Step 2: Choose Style (Broadcast Pack Selection)

**What changes:**
- Repurpose `PackBrowserPage.tsx` as wizard step 2.
- Add a wizard progress indicator at top.
- Each pack card shows: preview image, name, description, theme colors, category.
- "Preview" button on each card opens a quick preview modal.
- "Select" button advances to Step 3.

**Files affected:**
- `src/pages/PackBrowserPage.tsx` — add wizard step header/progress, modify navigation flow
- New: `src/components/wizard/WizardProgress.tsx` — shared step indicator

### Step 3: Personalize

**What changes:**
- New page/view: `PersonalizePage.tsx` shown after pack selection.
- Collect:
  - Streamer Name
  - Channel Name
  - Logo URL (or upload placeholder)
  - Avatar URL (or upload placeholder)
  - Primary Accent Color
  - Social Handles (Twitch, Twitter/X, YouTube, Discord, Instagram)
  - Optional Camera Frame style selection
  - Countdown default duration (slider: 1–30 min)
- Store these values in a new `streamerProfile` state object in the store.
- "Back" returns to Step 2, "Next" advances to Step 4.

**Files affected:**
- New: `src/pages/PersonalizePage.tsx`
- `src/store/editorStore.ts` — add `streamerProfile` state and actions
- New: `src/components/wizard/SocialHandleInput.tsx`

### Step 4: Theme Review

**What changes:**
- New page/view: `ThemeReviewPage.tsx`
- Show a live preview of the selected pack with:
  - Accent Color picker (overrides pack accent)
  - Background color picker
  - Text Color picker
  - Border Radius slider
  - Glass Intensity slider
  - Animations toggle (on/off)
  - Transitions selector (none/fade/slide)

- All changes update the preview in real time.
- These are **wizard-time overrides** stored separately from the pack defaults; they get applied when the project is created.

**Files affected:**
- New: `src/pages/ThemeReviewPage.tsx`
- New: `src/components/wizard/LivePreview.tsx` — live preview canvas using existing `SceneRenderer`
- `src/store/editorStore.ts` — add `wizardTheme` override state

### Step 5: Finish

**What changes:**
- New page/view: `WizardFinishPage.tsx`
- Summary of choices: pack name, streamer name, scene count
- Animated "Building your stream..." progress
- Calls `createProjectFromPack()` with theme overrides and personalization values applied
- On completion, navigates to the editor

**Files affected:**
- New: `src/pages/WizardFinishPage.tsx`
- `src/store/editorStore.ts` — modify `createProjectFromPack()` to accept optional personalization/theme overrides

### Wizard Navigation

- Store `wizardStep: number` (1–5) in the store.
- Replace the current `appView`-based routing for the wizard flow.
- Add `WizardProgress` component showing steps with visual indicators.
- Back/Next navigation persists form state.

---

## Part 2 — Asset Personalization

**What it does:** When a Broadcast Pack is imported with streamer profile data, automatically replace placeholder content in widgets.

**Placeholder mapping (applied during project creation):**

| Widget Type | Content Field | Placeholder Pattern | Replaced With |
|---|---|---|---|
| `text` | `settings.text` | `{STREAMER_NAME}` or `STREAMER` | Streamer Name |
| `text` | `settings.text` | `{CHANNEL_NAME}` | Channel Name |
| `logo` | `settings.src` | (empty/default) | Logo URL |
| `avatar-frame` | `settings.src` | (empty/default) | Avatar URL |
| `social-links` | `settings.links[].handle` | (default handles) | Actual handles from profile |
| `camera-frame` | `settings.frameLabel` | (default label) | Selected camera frame style |
| `countdown-timer` | `settings.duration` | 600 (default) | User's preferred duration |

**Implementation approach:**
- In `createProjectFromPack()`, after instantiating widgets, iterate through all widgets in all scenes and apply replacements based on `streamerProfile`.
- Add a helper function `applyStreamerProfile(scenes, profile)` in a new file.
- This runs at project creation time, not reactively.

**Files affected:**
- New: `src/personalization/placeholderReplacer.ts`
- `src/store/editorStore.ts` — modify `createProjectFromPack()` to call the replacer

---

## Part 3 — Theme Manager

**What changes:**
- New panel: `ThemeManagerPanel.tsx` added as a new tab in the LeftPanel (alongside Scenes, Layers, Assets, Widgets).
- Tab icon: Paintbrush icon.
- Panel content:
  - **Primary Color** picker
  - **Secondary Color** picker
  - **Accent Color** picker
  - **Background Color** picker
  - **Text Color** picker
  - **Borders** — color + width slider
  - **Glass** — toggle + blur intensity slider
  - **Shadow** — toggle + intensity slider
  - **Animation Speed** — slider (0.5x – 3x)
  - **Transition Style** — dropdown (none/fade/slide)
  - Action buttons:
    - Reset Theme (to pack defaults)
    - Duplicate Theme
    - Save Theme
    - Export Theme (future-ready — saves to localStorage for now)

**How it works:**
- Theme overrides are stored in a new `themeOverrides` state object in the store.
- A CSS-in-JS approach: the existing theme classes remain, but `themeOverrides` values are applied as inline CSS custom properties on `.app-shell` via a `useEffect` in `App.tsx` or the editor shell.
- Changes update Preview and Output immediately because they modify CSS variables that both consume.

**Files affected:**
- New: `src/editor/panels/ThemeManagerPanel.tsx`
- `src/store/editorStore.ts` — add `themeOverrides` state and actions
- `src/editor/panels/LeftPanel.tsx` — add Theme Manager tab
- `src/App.tsx` — apply theme overrides via CSS variables

---

## Part 4 — OBS Setup Wizard

**What changes:**
- New page/view: `OBSSetupPage.tsx` accessible from the editor toolbar (File menu → "OBS Setup Guide").
- Content:
  - **Browser Source URL**: Display the current output URL, with a Copy button.
  - **Recommended Settings**:
    - Resolution: 1920×1080
    - FPS: 60
    - Width: 1920
    - Height: 1080
  - **Step-by-step instructions**:
    1. Open OBS Studio
    2. Go to Scene → Add a new Scene (or select existing)
    3. Click "+" under Sources → Browser
    4. Name it "VibeOverlay Output"
    5. Paste the URL
    6. Set width: 1920, height: 1080
    7. (Optional) Check "Refresh browser when scene becomes active"
    8. Click OK
  - Visual mockup/screenshot placeholder
  - "Open Output Page" button
  - "Back to Editor" button

- Does NOT attempt automatic OBS integration.

**Files affected:**
- New: `src/pages/OBSSetupPage.tsx`
- `src/store/editorStore.ts` — add `appView: 'obs-setup'` to `AppView` union
- `src/App.tsx` — add route for OBS setup view
- `src/editor/toolbar/TopToolbar.tsx` — add "OBS Setup Guide" menu item

---

## Part 5 — Stream Readiness Checklist

**What changes:**
- New panel: `ReadinessPanel.tsx` added as a collapsible section in the editor's BottomStatusBar or in a new bottom drawer.
- Alternatively, can be a button in the toolbar that opens a modal.

**Checklist items (computed from store state):**
```
✓ Pack Selected        → selectedPackId !== null
✓ Logo Added           → any widget of type 'logo' with non-empty content.settings.src
✓ Username Added       → streamerProfile.name is non-empty
✓ Social Links Added   → streamerProfile has at least one handle
✓ Countdown Configured → any widget of type 'countdown-timer' with non-zero duration
✓ Output Running       → liveScenes.length > 0 (project is created)
✓ OBS Connected        → (stretch: manual checkbox for now)
✓ Browser Source Verified → (stretch: manual checkbox)
✓ Theme Applied        → selectedPackId !== null (pack theme class is applied)
```

- When all items are complete, display a "Ready to Go Live" badge with celebration styling.
- Items can be clicked to navigate to the relevant section (e.g., clicking "Logo Added" could navigate the user to the logo widget).

**Files affected:**
- New: `src/components/ReadinessPanel.tsx`
- `src/editor/toolbar/BottomStatusBar.tsx` — add readiness button/indicator
- `src/store/editorStore.ts` — add readiness computation helpers

---

## Store Changes Summary

### 1. Dedicated Wizard Store (`src/store/wizardStore.ts`)

Do NOT store temporary onboarding state inside `editorStore`. Create a separate Zustand store:

```typescript
interface WizardState {
  currentStep: number;                    // 0-4
  selectedPackId: string | null;
  streamerProfile: {
    streamerName: string;
    channelName: string;
    logoUrl: string;
    avatarUrl: string;
    accentColor: string;
    socialHandles: { platform: string; handle: string }[];
    cameraFrameStyle: string;
    countdownDuration: number;
  };
  wizardTheme: {
    accentColor: string | null;
    backgroundColor: string | null;
    textColor: string | null;
    borderRadius: number | null;
    glassIntensity: number | null;
    animationsEnabled: boolean;
    transitionStyle: 'none' | 'fade' | 'slide';
  };
  // Actions
  setStep: (step: number) => void;
  selectPack: (packId: string) => void;
  setStreamerProfile: (profile: Partial<WizardState['streamerProfile']>) => void;
  setWizardTheme: (theme: Partial<WizardState['wizardTheme']>) => void;
  resetWizard: () => void;
}
```

Only when the user clicks "Finish" should this state be transformed into a real project using `createProjectFromPack()`.

### 2. Theme Manager State (in editorStore)

Reduced scope for V0.6:

```typescript
themeOverrides: {
  accentColor: string | null;
  backgroundColor: string | null;
  textColor: string | null;
  borderRadius: number | null;
  glassIntensity: number | null;     // 0-100
  animationsEnabled: boolean;
  transitionStyle: 'none' | 'fade' | 'slide';
};
```

Actions:
- `setThemeOverrides(overrides)`
- `resetThemeOverrides()`
- `setReadinessCheck(key, value)`

### 3. Readiness State (in editorStore)

```typescript
readinessManualChecks: {
  obsConnected: boolean;
  browserSourceVerified: boolean;
};
```

---

## Wizard Component Structure

One parent container with reusable step components (NOT multiple standalone pages):

```
WelcomeWizard              ← renders based on wizardStore.currentStep
├── StepWelcome             ← Step 0 (Create New / Open Existing)
├── StepPackSelection       ← Step 1 (Browse + Select Pack)
├── StepPersonalize         ← Step 2 (Streamer Profile Form)
├── StepThemeReview         ← Step 3 (Live Preview + Adjustments)
└── StepFinish              ← Step 4 (Summary + Build Animation)
```

This simplifies routing, state management, and future maintenance. The wizard lives as a single view rendered by `App.tsx` when `appView === 'welcome'`.

---

## App Routing Changes

Extend `AppView` type:
```typescript
type AppView = 'welcome' | 'pack-browser' | 'pack-detail' | 'editor' | 'obs-setup';
```

The wizard replaces the welcome view. `PackBrowserPage` and `PackDetailPage` remain accessible from the editor's File menu for browsing during an active project.

---

## New Files Summary

```
src/
├── store/
│   └── wizardStore.ts                # Isolated wizard state
├── components/
│   └── wizard/
│       ├── WelcomeWizard.tsx          # Parent container (step router)
│       ├── WizardProgress.tsx         # Step indicator bar
│       ├── StepWelcome.tsx            # Step 0
│       ├── StepPackSelection.tsx      # Step 1 (pack grid + preview)
│       ├── StepPersonalize.tsx        # Step 2 (profile form)
│       ├── StepThemeReview.tsx        # Step 3 (live preview + toggles)
│       ├── StepFinish.tsx             # Step 4 (build animation)
│       └── LivePreview.tsx            # Live theme preview canvas
├── components/
│   ├── ReadinessPanel.tsx             # Stream readiness checklist
│   └── OBSSetupGuide.tsx              # OBS setup guide modal/page
├── editor/
│   └── panels/
│       └── ThemeManagerPanel.tsx      # Reduced-scope theme editor
└── personalization/
    └── placeholderReplacer.ts         # Auto-replace placeholders with profile data
```

---

## Documentation Updates

- `STREAMER_WORKFLOW.md` — new document with user journey overview
- `TEST_PLAN.md` — add test cases for all 5 parts
- `walkthrough.md` — update with new wizard flow
- `implementation_plan.md` — this file (will serve as the plan)
- `task.md` — create task tracker

---

## Verification Steps

After each part is implemented:

1. `npm run build` — must pass
2. `npm run lint` — must pass
3. Manual walkthrough of the feature

Final verification before completion:
- Complete end-to-end walkthrough of the entire onboarding flow
- Verify no regressions in existing editor functionality
- Verify all checklist items are satisfiable

---

## Implementation Order

1. Part 1 — New Stream Wizard (Steps 1-5)
2. Part 2 — Asset Personalization
3. Part 3 — Theme Manager
4. Part 4 — OBS Setup Wizard
5. Part 5 — Stream Readiness Checklist
6. Documentation updates
7. Final verification

---

**This plan awaits your approval before implementation begins.**
