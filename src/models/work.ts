import Page, { PageJson } from './page';

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

export const defaultWorkJson: WorkConstructorConfig = {
  name: 'New Work',
  mode: 'h5_long_page',
};

export const h5_long_page: WorkModeTemplate = {
  name: 'h5_long_page',
  maxPages: 1,
  minPages: 1,
};

export const h5_swiper: WorkModeTemplate = {
  name: 'h5_swiper',
  maxPages: 100,
  minPages: 2,
};

export class Work {
  /**
   * 工作区类型
   */
  static Modes: WorkModes = {};
  /**
   * 注册工作区
   * @param workMode - 工作区类型对象
   */
  static use(workMode: WorkModeTemplate) {
    if (Work.Modes[workMode.name]) {
      throw new Error(`工作区类型 ${workMode.name} 已经注册了`);
    }

    Work.Modes[workMode.name] = workMode;
  }
  /**
   * Id，数据库唯一标识
   */
  readonly id: number;

  /**
   * 名称，仅显示用
   */
  name: string | undefined;

  /**
   * 页面数组，使用数组是为了考虑多页面的场景
   */
  readonly elements: Page[] = [];

  /**
   * 页面数量
   */
  get size() {
    return this.elements.length;
  }

  /**
   * 工作区类型，决定了用什么模版去渲染页面
   */
  readonly mode: WorkMode;

  /**
   * 创建一个工作区
   * @param param0 - 构建参数
   */
  constructor({
    id,
    name = defaultWorkJson.name,
    mode = defaultWorkJson.mode,
  }: WorkConstructorConfig = defaultWorkJson) {
    this.id = id || 0;
    this.name = name;
    this.mode = mode;
  }

  /**
   * 添加一个页面
   * @param page - 页面
   */
  addChild(page: Page) {
    if (this.canAdd()) {
      this.elements.push(page);
    }

    return this;
  }

  /**
   * 移除页面
   * @param page - 页面
   */
  removeChild(page: Page) {
    const { elements } = this;

    for (let i = 0; i < elements.length; i++) {
      const ele = elements[i];
      if (ele === page) {
        this.removeChildByIndex(i);
        break;
      }
    }

    return this;
  }

  /**
   * 通过index移除页面
   * @param index - 页面在数组中的index
   */
  removeChildByIndex(index: number) {
    if (this.canRemove()) {
      this.elements.splice(index, 1);
    }

    return this;
  }

  /**
   * 判断是否可以移除页面
   */
  canRemove(): boolean {
    return this.size > Work.Modes[this.mode].minPages;
  }

  /**
   * 判断是否可以添加页面
   */
  canAdd(): boolean {
    return this.size < Work.Modes[this.mode].maxPages;
  }

  /**
   * 克隆工作区，包括页面和组件及其子组件
   */
  clone() {
    const work = new Work({
      name: this.name,
      mode: this.mode,
    });

    const elements = this.elements.map((page): Page => page.clone());

    elements.forEach((page) => {
      work.addChild(page);
    });

    return work;
  }

  /**
   * 当前工作区转为Json对象，入库
   */
  toJson(): WorkJson {
    const myWork: WorkJson = {
      id: this.id,
      name: this.name,
      elements: [],
      mode: this.mode,
    };

    this.elements.forEach((page: Page) => {
      myWork.elements.push(page.toJson());
    });

    return myWork;
  }
}

Work.use(h5_long_page);
Work.use(h5_swiper);

export default Work;
