import { commandBus } from './commandBus';
import { useEditorStore } from '../store/editorStore';

export function initializeCommandHandlers(): () => void {
  const unsubs: Array<() => void> = [];

  unsubs.push(
    commandBus.register('SWITCH_SCENE', ({ sceneId }) => {
      useEditorStore.getState().setEditingScene(sceneId);
    })
  );

  unsubs.push(
    commandBus.register('SHOW_WIDGET', ({ widgetId }) => {
      useEditorStore.getState().updateWidget(widgetId, { visible: true });
    })
  );

  unsubs.push(
    commandBus.register('HIDE_WIDGET', ({ widgetId }) => {
      useEditorStore.getState().updateWidget(widgetId, { visible: false });
    })
  );

  unsubs.push(
    commandBus.register('SET_TIMER', ({ widgetId, duration }) => {
      const store = useEditorStore.getState();
      const scene = store.scenes.find(s => s.id === store.editingSceneId);
      const widget = scene?.widgets.find(w => w.id === widgetId);
      if (widget) {
        store.updateWidget(widgetId, {
          content: {
            ...widget.content,
            settings: {
              ...widget.content.settings,
              duration,
            },
          },
        });
      }
    })
  );

  unsubs.push(
    commandBus.register('PAUSE_TIMER', ({ widgetId }) => {
      const store = useEditorStore.getState();
      const scene = store.scenes.find(s => s.id === store.editingSceneId);
      const widget = scene?.widgets.find(w => w.id === widgetId);
      if (widget) {
        store.updateWidget(widgetId, {
          content: {
            ...widget.content,
            settings: {
              ...widget.content.settings,
              paused: true,
            },
          },
        });
      }
    })
  );

  unsubs.push(
    commandBus.register('RESUME_TIMER', ({ widgetId }) => {
      const store = useEditorStore.getState();
      const scene = store.scenes.find(s => s.id === store.editingSceneId);
      const widget = scene?.widgets.find(w => w.id === widgetId);
      if (widget) {
        store.updateWidget(widgetId, {
          content: {
            ...widget.content,
            settings: {
              ...widget.content.settings,
              paused: false,
            },
          },
        });
      }
    })
  );

  return () => {
    unsubs.forEach(unsub => unsub());
  };
}
export default initializeCommandHandlers;
