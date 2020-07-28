import { PageConstructorConfig, PageJson } from 'src/types';
import Element from './element';

export class Page {
  /**
   * 页面名称，可以作为title显示
   */
  name: string;

  /**
   * 页面组件
   */
  readonly elements: Element[] = [];

  /**
   * 页面组件数量
   */
  get size() {
    return this.elements.length;
  }

  /**
   * 创建一个页面
   * @param param0 - 构造参数
   */
  constructor({ name = 'New Page' }: PageConstructorConfig = {}) {
    this.name = name;
  }

  /**
   * 添加一个组件
   * @param element - 组件
   */
  addChild(element: Element) {
    this.elements.push(element);

    return this;
  }

  /**
   * 移除组件
   * @param element - 组件
   */
  removeChild(element: Element) {
    const { elements } = this;

    for (let i = 0; i < elements.length; i++) {
      const ele = elements[i];
      if (ele === element || ele.id === element.id) {
        this.removeChildByIndex(i);
        break;
      }
    }

    return this;
  }

  /**
   * 通过index移除组件
   * @param index - 组件在数组的index
   */
  removeChildByIndex(index: number) {
    this.elements.splice(index, 1);

    return this;
  }

  /**
   * 克隆页面，包含页面内的组件及其子组件
   */
  clone() {
    const page = new Page({
      name: this.name,
    });

    const elements = this.elements.map((ele): Element => ele.clone());

    elements.forEach((ele) => {
      page.addChild(ele);
    });

    return page;
  }

  /**
   * 当前页面转为Json对象
   */
  toJson(): PageJson {
    const page: PageJson = {
      name: this.name,
      elements: [],
    };

    this.elements.forEach((element: Element) => {
      page.elements.push(element.toJson());
    });

    return page;
  }
}

export default Page;
