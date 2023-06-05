export interface Technology {
  id: number;
  name: string;
  description: string;
  author: string;
  site: string;
  icon: string;
  iconColor?: string;
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
  iconColor?: string;
}
