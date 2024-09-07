export interface BuilderState {
  sections: Section[];
}

export interface Section {
  id: string;
  name: string;
  blocks: BlockFormMap[];
}

// Define the BuilderState interface or type

export interface SectionForm {
  [key: string]: any[];
}

export interface SectionField {
  [key: string]: string;
}

export interface BlockTypes {
  icon: string;
  type: string;
  name: string;
}

// export interface BlockTypesMap {
//   default: Block[];
// }

export interface BlockFormCommon {
  id: string;
  class: string;
  background_color: string;
}

export interface BlockFormButton extends BlockFormCommon {
  label: string;
  button_color: string;
  url: string;
}

export interface BlockFormImage extends BlockFormCommon {
  url: string;
  alt: string;
  image_id: string;
}

export interface BlockFormHtml extends BlockFormCommon {
  html: string;
}

// Union type for all possible block forms
export type BlockFormMap = BlockFormButton | BlockFormImage | BlockFormHtml;

// Fixed attributes
interface BlockFormExtras {
  block_title: string;
  block_type: string;
}

export type ExtendedBlockFormMap = BlockFormMap & BlockFormExtras;
