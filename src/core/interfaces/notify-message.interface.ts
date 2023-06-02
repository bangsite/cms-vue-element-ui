import type { BadgeProps, TagProps } from "element-plus";

export interface MessageTab {
  key: number;
  name: string;
  badgeProps?: BadgeProps;
  list: MessageList[];
}

interface MessageList {
  id: number;
  avatar?: string;
  icon?: string;
  svgIcon?: string;
  title: string;
  date?: string;
  isRead?: boolean;
  description?: string;
  tagTitle?: string;
  tagProps?: TagProps;
}
