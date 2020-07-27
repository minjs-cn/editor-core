import { WorkConstructorConfig } from 'src/types';
import Page from './page';

class Work {
  readonly id: number;

  name: string;

  readonly elements: Page[] = [];

  get size() {
    return this.elements.length;
  }

  constructor({ id, name = 'New Work' }: WorkConstructorConfig = {}) {
    this.id = id || 0;
    this.name = name;
  }

  addChild(page: Page) {
    this.elements.push(page);

    return this;
  }

  removeChild(element: Page) {
    const { elements } = this;

    for (let i = 0; i < elements.length; i++) {
      const ele = elements[i];
      if (ele === element) {
        this.removeChildByIndex(i);
        break;
      }
    }

    return this;
  }

  removeChildByIndex(index: number) {
    if (this.canRemove()) {
      this.elements.splice(index, 1);
    }

    return this;
  }

  canRemove(): boolean {
    return this.elements.length > 1;
  }

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
}

export default Work;
