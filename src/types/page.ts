import { ElementJson } from './element';

export interface PageConstructorConfig {
  name?: string;
}

export interface PageJson {
  name: string;
  elements: ElementJson[];
}
