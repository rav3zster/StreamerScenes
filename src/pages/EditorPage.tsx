import React, { useEffect, useState } from 'react';
import { SidebarRail, LeftPanel } from '../editor/panels/LeftPanel';
import { RightPanel } from '../editor/panels/RightPanel';
import { EditorCanvas } from '../editor/canvas/EditorCanvas';
import { TopToolbar } from '../editor/toolbar/TopToolbar';
import { BottomStatusBar } from '../editor/toolbar/BottomStatusBar';
import { useEditorStore } from '../store/editorStore';
import { persistenceService } from '../persistence/persistenceService';

export const EditorPage: React.FC = () => {
  const { appView, leftPanelWidth, setLeftPanelWidth, rightPanelWidth, setRightPanelWidth } = useEditorStore();
  const [activeResize, setActiveResize] = useState<'left' | 'right' | null>(null);

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

  const startResizeLeft = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveResize('left');
  };

  const startResizeRight = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveResize('right');
  };

  useEffect(() => {
    if (!activeResize) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (activeResize === 'left') {
        // Sidebar rail is 56px.
        const newWidth = e.clientX - 56;
        setLeftPanelWidth(newWidth);
      } else if (activeResize === 'right') {
        const newWidth = window.innerWidth - e.clientX;
        setRightPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setActiveResize(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeResize, setLeftPanelWidth, setRightPanelWidth]);

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

        {/* Drag Resizer for Left Panel */}
        <div
          className={`resizer-v${activeResize === 'left' ? ' active' : ''}`}
          onMouseDown={startResizeLeft}
        />

        {/* Canvas — takes all remaining space */}
        <EditorCanvas />

        {/* Drag Resizer for Right Panel */}
        <div
          className={`resizer-v${activeResize === 'right' ? ' active' : ''}`}
          onMouseDown={startResizeRight}
        />

        {/* Right Inspector */}
        <RightPanel />
      </div>

      {/* Bottom Status Bar — full width */}
      <BottomStatusBar />
    </div>
  );
};
