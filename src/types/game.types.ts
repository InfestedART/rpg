export type MsgType = 'info' | 'warning' | 'error' | 'important';

export interface MessageLogType {
  message: string;
  timestamp: number;
  type: MsgType;
}

export type SelectOptions = {
  label: string,
  value: string | number,
}