export interface ITechnology {
  id: number;
  name: string;
  description: string;
  author: string;
  site: string;
  icon: string;
  color?: string;
}

export interface IActivity {
  id: number;
  content: string;
  time: string;
}

export interface IShortcut {
  id: number;
  label: string;
  icon: string;
  color?: string;
}
