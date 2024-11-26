export interface Post {
  title: String;
  body: String;
}

export interface PostTreeNode {
  id: number;
  label: string;
  children?: PostTreeNode[];
}
