import React, { useEffect } from 'react';
import { SidebarRail, LeftPanel } from '../editor/panels/LeftPanel';
import { RightPanel } from '../editor/panels/RightPanel';
import { EditorCanvas } from '../editor/canvas/EditorCanvas';
import { TopToolbar } from '../editor/toolbar/TopToolbar';
import { BottomStatusBar } from '../editor/toolbar/BottomStatusBar';
import { WelcomeWizard } from '../components/WelcomeWizard';
import { useEditorStore } from '../store/editorStore';
import { persistenceService } from '../persistence/persistenceService';

export const EditorPage: React.FC = () => {
  const { isWelcomeActive } = useEditorStore();

  useEffect(() => {
    persistenceService.loadProject().then(data => {
      if (data) {
        useEditorStore.getState().loadProjectData(data);
      }
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Welcome Wizard Onboarding Page */}
      {isWelcomeActive && <WelcomeWizard />}

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
