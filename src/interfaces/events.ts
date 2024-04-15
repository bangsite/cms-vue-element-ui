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
