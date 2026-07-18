import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { SceneRenderer } from '../renderer/SceneRenderer';
import { CANVAS_W, CANVAS_H } from '../editor/canvas/EditorCanvas';
import { persistenceService } from '../persistence/persistenceService';

export const OutputPage: React.FC = () => {
  const liveScenes = useEditorStore(state => state.liveScenes);
  const liveSceneId = useEditorStore(state => state.liveSceneId);
  const loadProjectData = useEditorStore(state => state.loadProjectData);
  const [scale, setScale] = useState(1);

  // Find the live scene, or fall back to the first available scene
  const liveScene = liveScenes.find(s => s.id === liveSceneId) ?? liveScenes[0];

  useEffect(() => {
    persistenceService.loadProject().then(data => {
      if (data) {
        loadProjectData(data);
      }
    });
  }, [loadProjectData]);

  useEffect(() => {
    const handleResize = () => {
      const s = Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);
      setScale(s);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!liveScene) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          color: '#333',
          fontFamily: 'sans-serif',
          fontSize: '14px',
        }}
      >
        No Live Scene Selected
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'transparent', // Transparent for OBS green-screen/chromakey/alpha blending
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle hover-reveal back button: invisible in OBS capture (low idle opacity) but clickable in browser */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(12,10,26,0.9)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          padding: '8px 14px',
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          textDecoration: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
          transition: 'all 0.15s ease',
          opacity: 0.05,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.background = 'var(--color-accent)';
          e.currentTarget.style.borderColor = 'var(--color-accent)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '0.05';
          e.currentTarget.style.background = 'rgba(12,10,26,0.9)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        }}
      >
        <ArrowLeft size={13} /> Return to Studio
      </Link>

      <div
        style={{
          width: `${CANVAS_W * scale}px`,
          height: `${CANVAS_H * scale}px`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <SceneRenderer
          widgets={liveScene.widgets}
          zoom={scale}
          animated={true} // Animations ENABLED for live output
          timerSource="live"
        />
      </div>
    </div>
  );
};

export default OutputPage;
