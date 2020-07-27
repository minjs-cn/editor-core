import { PageJson } from './page';

export interface WorkConstructorConfig {
  id?: number;
  name?: string;
}

export interface WorkJson {
  id?: number;
  name: string;
  elements: PageJson[];
}
