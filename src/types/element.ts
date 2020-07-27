export interface ElementConstructorConfig {
  id?: number;
  name: string;
}

export interface ElementJson {
  id?: number;
  name: string;
  elements: ElementJson[];
}
