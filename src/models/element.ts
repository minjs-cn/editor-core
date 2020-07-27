import { genUuid } from 'src/utils/uuid';
import { ElementConstructorConfig, ElementJson } from 'src/types';

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

  toJson(): ElementJson {
    const element: ElementJson = {
      id: this.id,
      name: this.name,
      elements: [],
    };

    if (this.size) {
      this.elements.forEach((ele: Element) => {
        element.elements.push(ele.toJson());
      });
    }

    return element;
  }
}

export default Element;
