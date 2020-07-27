import { WorkConstructorConfig, WorkJson, PageJson, ElementJson } from 'src/types';
import Work from 'src/models/work';
import Page from 'src/models/page';
import Element from 'src/models/element';

export function createEmptyWork(work: WorkJson): Work {
  const emptyWorkJson = work || {
    elements: [
      {
        elements: [
          {
            name: 'Welcome',
          },
        ],
      },
    ],
  };

  return createEmptyWork(emptyWorkJson);
}

export function createWork(work: WorkJson): Work {
  const myWork = new Work({
    id: work.id,
    name: work.name,
  });

  work.elements.forEach((pageJson: PageJson) => {
    const page = new Page(pageJson);

    pageJson.elements.forEach((elementJson: ElementJson) => {
      const element = new Element(elementJson);

      if (element.size) {
        element.elements.forEach((eleJson: ElementJson) => {
          element.addChild(new Element(eleJson));
        });
      }

      page.addChild(element);
    });

    myWork.addChild(page);
  });

  return myWork;
}
