import React, { useEffect } from 'react';
import { SidebarRail, LeftPanel } from '../editor/panels/LeftPanel';
import { RightPanel } from '../editor/panels/RightPanel';
import { EditorCanvas } from '../editor/canvas/EditorCanvas';
import { TopToolbar } from '../editor/toolbar/TopToolbar';
import { BottomStatusBar } from '../editor/toolbar/BottomStatusBar';
import { useEditorStore } from '../store/editorStore';
import { persistenceService } from '../persistence/persistenceService';

export const EditorPage: React.FC = () => {
  const { appView, loadProjectData } = useEditorStore();

  useEffect(() => {
    // Only attempt to load a saved project on first mount when still on welcome view
    if (appView === 'welcome') {
      persistenceService.loadProject().then(data => {
        if (data && data.scenes && data.scenes.length > 0) {
          // Don't auto-load into editor — let WelcomePage handle this choice
          // Data is available if user clicks "Continue"
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Top Toolbar — full width */}
      <TopToolbar />

      {/* Middle row: sidebar + panels + canvas + inspector */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {/* Icon Rail */}
        <SidebarRail />

        {/* Left Panel */}
        <LeftPanel />

        {/* Canvas — takes all remaining space */}
        <EditorCanvas />

        {/* Right Inspector */}
        <RightPanel />
      </div>

      {/* Bottom Status Bar — full width */}
      <BottomStatusBar />
    </div>
  );
};
