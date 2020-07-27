import { genUuid } from '../utils/uuid';
import { ElementConstructorConfig } from '../types';

class Element {
  readonly id: number;

  readonly name: string;

  readonly elements: Element[] = [];

  get size() {
    return this.elements.length;
  }

  constructor({ name, id }: ElementConstructorConfig) {
    this.id = id || genUuid();
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
    const element = new Element({
      name: this.name,
    });

    const elements = this.elements.map((ele): Element => ele.clone());

    elements.forEach((ele) => {
      element.addChild(ele);
    });

    return element;
  }
}

export default Element;
