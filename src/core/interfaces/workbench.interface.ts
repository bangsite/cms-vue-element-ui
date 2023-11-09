export interface Technology {
  id: number;
  name: string;
  description: string;
  author: string;
  site: string;
  icon: string;
  color?: string;
}

export interface Activity {
  id: number;
  content: string;
  time: string;
}

export interface Shortcuts {
  id: number;
  label: string;
  icon: string;
  color?: string;
}
