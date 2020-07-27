import { PageConstructorConfig } from 'src/types';
import Element from './element';

class Page {
  name: string;

  readonly elements: Element[] = [];

  get size() {
    return this.elements.length;
  }

  constructor({ name = 'New Page' }: PageConstructorConfig = {}) {
    this.name = name;
  }

  addChild(element: Element) {
    this.elements.push(element);

    return this;
  }

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

  removeChildByIndex(index: number) {
    this.elements.splice(index, 1);

    return this;
  }

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
}

export default Page;
