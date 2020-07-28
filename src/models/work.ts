import { WorkConstructorConfig, WorkJson } from 'src/types';
import Page from './page';

export class Work {
  /**
   * Id，数据库唯一标识
   */
  readonly id: number;

  /**
   * 名称，仅显示用
   */
  name: string;

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
   * 创建一个工作区
   * @param param0 - 构建参数
   */
  constructor({ id, name = 'New Work' }: WorkConstructorConfig = {}) {
    this.id = id || 0;
    this.name = name;
  }

  /**
   * 添加一个页面
   * @param page - 页面
   */
  addChild(page: Page) {
    this.elements.push(page);

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
   * 判断是否可以移除页面，默认至少有一个页面
   */
  canRemove(): boolean {
    return this.elements.length > 1;
  }

  /**
   * 克隆工作区，包括页面和组件及其子组件
   */
  clone() {
    const work = new Work({
      name: this.name,
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
    };

    this.elements.forEach((page: Page) => {
      myWork.elements.push(page.toJson());
    });

    return myWork;
  }
}

export default Work;
