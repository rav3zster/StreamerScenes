import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';
import { SceneRenderer } from '../renderer/SceneRenderer';
import { CANVAS_W, CANVAS_H } from '../editor/canvas/EditorCanvas';

export const OutputPage: React.FC = () => {
  const { scenes, liveSceneId } = useEditorStore();
  const [scale, setScale] = useState(1);

  // Find the live scene, or fall back to the first available scene
  const liveScene = scenes.find(s => s.id === liveSceneId) ?? scenes[0];

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
        />
      </div>
    </div>
  );
};

export default OutputPage;
