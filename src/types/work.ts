import { PageJson } from './page';
import Work from 'src/models/work';

export type WorkMode = 'h5_swiper' | 'h5_long_page';

export interface WorkConstructorConfig {
  id?: number;
  name?: string;
  mode: WorkMode;
}

export interface WorkJson {
  id?: number;
  name: string | undefined;
  elements: PageJson[];
  mode: WorkMode;
}

export interface WorkModes {
  [index: string]: WorkModeTemplate;
}

export interface WorkModeTemplate {
  name: WorkMode;
  maxPages: number;
  minPages: number;
}
