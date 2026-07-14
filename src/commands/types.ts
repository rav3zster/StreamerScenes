export interface SwitchSceneCommand {
  type: 'SWITCH_SCENE';
  payload: { sceneId: string };
}

export interface ShowWidgetCommand {
  type: 'SHOW_WIDGET';
  payload: { widgetId: string };
}

export interface HideWidgetCommand {
  type: 'HIDE_WIDGET';
  payload: { widgetId: string };
}

export interface SetTimerCommand {
  type: 'SET_TIMER';
  payload: { widgetId: string; duration: number };
}

export interface PauseTimerCommand {
  type: 'PAUSE_TIMER';
  payload: { widgetId: string };
}

export interface ResumeTimerCommand {
  type: 'RESUME_TIMER';
  payload: { widgetId: string };
}

export type Command =
  | SwitchSceneCommand
  | ShowWidgetCommand
  | HideWidgetCommand
  | SetTimerCommand
  | PauseTimerCommand
  | ResumeTimerCommand;

export type CommandHandler = (payload: any) => void;
export type CommandType = Command['type'];
export type CommandPayloadMap = {
  SWITCH_SCENE: { sceneId: string };
  SHOW_WIDGET: { widgetId: string };
  HIDE_WIDGET: { widgetId: string };
  SET_TIMER: { widgetId: string; duration: number };
  PAUSE_TIMER: { widgetId: string };
  RESUME_TIMER: { widgetId: string };
};
