import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditorPage } from './pages/EditorPage';
import { OutputPage } from './pages/OutputPage';
import { WelcomePage } from './pages/WelcomePage';
import { PackBrowserPage } from './pages/PackBrowserPage';
import { PackDetailPage } from './pages/PackDetailPage';
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
      {appView === 'welcome' && <WelcomePage />}
      {appView === 'pack-browser' && <PackBrowserPage />}
      {appView === 'pack-detail' && <PackDetailPage />}
      {appView === 'editor' && <EditorPage />}
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <div className="app-shell">
      <Routes>
        <Route path="/output" element={<OutputPage />} />
        <Route path="/*" element={<StudioRouter />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
