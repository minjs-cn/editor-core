export interface ElementEditorStyle {
  position: 'relative' | 'absolute';
  left: number;
  top: number;
  width: number;
  height: number;
  backgroundColor: string;
}

export interface ElementProps {
  [index: string]: any;
}

export interface ElementEditorProps {
  [index: string]: any;
}

export interface ElementConstructorConfig {
  id?: number;
  name: string;
  editorStyle?: ElementEditorStyle;
  props?: ElementProps;
  editorProps?: ElementEditorProps;
}

export interface ElementJson {
  id?: number;
  name: string;
  elements: ElementJson[];
  editorStyle: ElementEditorStyle;
  editorProps: ElementEditorProps;
}
