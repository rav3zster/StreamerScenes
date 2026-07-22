import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditorPage } from './pages/EditorPage';
import { OutputPage } from './pages/OutputPage';
import { WelcomeWizard } from './components/wizard/WelcomeWizard';
import { OBSSetupGuide } from './components/OBSSetupGuide';
import { PackBrowserPage } from './pages/PackBrowserPage';
import { PackDetailPage } from './pages/PackDetailPage';
import { TransitionStudioPage } from './pages/TransitionStudioPage';
import { CommandPalette } from './components/CommandPalette';
import { useEditorStore } from './store/editorStore';

const StudioRouter: React.FC = () => {
  const { appView, setAppView } = useEditorStore();

  // Sync back/forward navigation (popstate)
  useEffect(() => {
    if (!window.history.state || window.history.state.view !== appView) {
      window.history.replaceState({ view: appView }, '', '');
    }

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.view) {
        setAppView(e.state.view);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setAppView]);

  // Sync store view changes to browser history
  useEffect(() => {
    if (window.history.state?.view !== appView) {
      window.history.pushState({ view: appView }, '', '');
    }
  }, [appView]);

  return (
    <>
      {appView === 'welcome' && <WelcomeWizard />}
      {appView === 'pack-browser' && <PackBrowserPage />}
      {appView === 'pack-detail' && <PackDetailPage />}
      {appView === 'editor' && <EditorPage />}
      {appView === 'obs-setup' && <OBSSetupGuide />}
      {appView === 'transition-studio' && <TransitionStudioPage />}
    </>
  );
};

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeOverrides = useEditorStore(s => s.themeOverrides);
  const editorTheme = useEditorStore(s => s.editorTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', editorTheme);
  }, [editorTheme]);

  useEffect(() => {
    const shell = document.querySelector('.app-shell') as HTMLElement | null;
    if (!shell) return;

    if (themeOverrides.accentColor) shell.style.setProperty('--color-accent', themeOverrides.accentColor);
    else shell.style.removeProperty('--color-accent');

    if (themeOverrides.backgroundColor) shell.style.setProperty('--color-bg', themeOverrides.backgroundColor);
    else shell.style.removeProperty('--color-bg');

    if (themeOverrides.textColor) shell.style.setProperty('--color-text', themeOverrides.textColor);
    else shell.style.removeProperty('--color-text');

    if (themeOverrides.borderRadius !== null) {
      shell.style.setProperty('--radius-md', `${themeOverrides.borderRadius}px`);
      shell.style.setProperty('--radius-lg', `${Math.min(themeOverrides.borderRadius + 4, 48)}px`);
    } else {
      shell.style.removeProperty('--radius-md');
      shell.style.removeProperty('--radius-lg');
    }

    shell.style.setProperty('--animations-enabled', themeOverrides.animationsEnabled ? '1' : '0');
  }, [themeOverrides]);

  return <>{children}</>;
};

const App: React.FC = () => (
  <BrowserRouter>
    <div className="app-shell">
      <AppShell>
        <Routes>
          <Route path="/output" element={<OutputPage />} />
          <Route path="/*" element={<StudioRouter />} />
        </Routes>
        <CommandPalette />
      </AppShell>
    </div>
  </BrowserRouter>
);

export default App;
