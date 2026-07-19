import React, { useState, useEffect, useRef } from 'react';
import type { Scene } from '../store/editorStore';
import { SceneRenderer } from './SceneRenderer';

interface SceneTransitionerProps {
  activeSceneId: string | null;
  scenes: Scene[];
  zoom: number;
  animated?: boolean;
  timerSource?: 'live' | 'preview';
  transitionType: 'none' | 'fade' | 'slide';
  transitionDuration: number;
}

export const SceneTransitioner: React.FC<SceneTransitionerProps> = ({
  activeSceneId,
  scenes,
  zoom,
  animated = false,
  timerSource = 'preview',
  transitionType,
  transitionDuration,
}) => {
  const [renderState, setRenderState] = useState<{
    currentId: string | null;
    prevId: string | null;
    isTransitioning: boolean;
  }>({
    currentId: activeSceneId,
    prevId: null,
    isTransitioning: false,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (activeSceneId === renderState.currentId) return;

    if (transitionType === 'none' || transitionDuration <= 0 || !activeSceneId || !renderState.currentId) {
      // Instant switch
      setRenderState({
        currentId: activeSceneId,
        prevId: null,
        isTransitioning: false,
      });
      return;
    }

    // Start transition
    if (timerRef.current) clearTimeout(timerRef.current);

    setRenderState({
      currentId: activeSceneId,
      prevId: renderState.currentId,
      isTransitioning: true,
    });

    timerRef.current = setTimeout(() => {
      setRenderState(prev => ({
        ...prev,
        prevId: null,
        isTransitioning: false,
      }));
    }, transitionDuration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeSceneId, transitionType, transitionDuration]);

  const currentScene = scenes.find(s => s.id === renderState.currentId);
  const prevScene = scenes.find(s => s.id === renderState.prevId);

  // Styling helpers for transition layers
  const getLayerStyle = (isEntering: boolean): React.CSSProperties => {
    if (!renderState.isTransitioning) {
      return {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      };
    }

    const durationSec = `${transitionDuration}ms`;

    if (transitionType === 'fade') {
      return {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        transition: `opacity ${durationSec} cubic-bezier(0.4, 0, 0.2, 1)`,
        opacity: isEntering ? 1 : 0,
        pointerEvents: isEntering ? 'all' : 'none',
      };
    }

    if (transitionType === 'slide') {
      return {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        transition: `transform ${durationSec} cubic-bezier(0.4, 0, 0.2, 1)`,
        transform: isEntering ? 'translateX(0%)' : 'translateX(-100%)',
        pointerEvents: isEntering ? 'all' : 'none',
      };
    }

    return {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
    };
  };

  // State to force initial CSS rendering frame for slide/fade entering
  const [triggerTransitionStart, setTriggerTransitionStart] = useState(false);
  useEffect(() => {
    if (renderState.isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setTriggerTransitionStart(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setTriggerTransitionStart(false);
    }
  }, [renderState.isTransitioning]);

  const renderScene = (scene: Scene, isEntering: boolean) => {
    let style = getLayerStyle(isEntering);
    if (renderState.isTransitioning && isEntering && !triggerTransitionStart) {
      if (transitionType === 'fade') style = { ...style, opacity: 0 };
      if (transitionType === 'slide') style = { ...style, transform: 'translateX(100%)' };
    }

    return (
      <div key={scene.id} style={style}>
        <SceneRenderer
          widgets={scene.widgets}
          zoom={zoom}
          animated={animated}
          timerSource={timerSource}
        />
      </div>
    );
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {prevScene && renderScene(prevScene, false)}
      {currentScene && renderScene(currentScene, true)}
    </div>
  );
};
