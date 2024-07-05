export interface Event {
  id: number;
  type: string;
  title: string;
  date: string;
  month: string;
  time: string;
}

export type EventData = {
  today?: Event[];
  week?: Event[];
  month?: Event[];
} & { [key: string]: Event[] };

export type TransactionSate = {
  today?: any[];
  week?: any[];
  month?: any[];
} & { [key: string]: any[] };

export type BrowserState = {
  today?: any[];
  week?: any[];
  month?: any[];
} & { [key: string]: any };
