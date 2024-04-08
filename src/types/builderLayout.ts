// Define the Section interface or type
export interface BuilderState {
  sections: Section[];
  blockTypes: Block[];
}

export interface Section {
  name: string;
  blocks?: BlockFormMap[];
}

// Define the BuilderState interface or type

export interface SectionForm {
  [key: string]: any[];
}

export interface SectionField {
  [key: string]: string;
}

export interface Block {
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

export interface BlockFormMap {
  [key: string]: BlockFormCommon | BlockFormButton | BlockFormImage | BlockFormHtml;
}

export interface BlockData {
  block_title: string;
  block_type: string;
  section_name: string;
}
