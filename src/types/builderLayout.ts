export interface Page {
  id: string;
  name: string;
  layoutSettings: LayoutSettings;
  sections: Section[];
}

export interface LayoutSettings {
  layoutType: string; //"grid", "flex", "custom"
  columns?: number;
  rowHeight?: string;
}

export interface Section {
  id: string;
  name: string;
  blocks?: BlockFormMap[];
}

export interface BlockFormCommon {
  id: string;
  class: string;
  backgroundColor: string;
  title: string;
  type: string;
}

export interface BlockFormButton extends BlockFormCommon {
  label: string;
  buttonColor: string;
  url: string;
}

export interface BlockFormImage extends BlockFormCommon {
  url: string;
  alt: string;
  imageId: string;
}

export interface BlockFormHtml extends BlockFormCommon {
  html: string;
}

export interface BlockFormMap {
  [key: string]: BlockFormCommon | BlockFormButton | BlockFormImage | BlockFormHtml;
}

export type ExtraBlockForm = BlockFormMap & { sectionIndex: number; blockIndex: number };

export interface BlockType {
  icon: string;
  type: string;
  nameKey: string;
  status?: boolean;
}

export interface PageTreeNode {
  id: number;
  label: string;
  children?: PageTreeNode[];
}
