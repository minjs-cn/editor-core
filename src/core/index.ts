import {
  Page,
  Work,
  Element,
  getElementEditorBasicStyle,
  defaultWorkJson,
  WorkJson,
  PageJson,
  ElementJson,
} from '../models';

/**
 * 创建一个空的工作区
 */
export function createWorkspace(): Work {
  const emptyWorkJson: WorkJson = {
    name: defaultWorkJson.mode,
    mode: defaultWorkJson.mode,
    elements: [
      {
        name: 'New Page',
        elements: [
          {
            name: 'Welcome',
            elements: [],
            editorProps: {
              title: 'welcome',
            },
            editorStyle: getElementEditorBasicStyle(),
          },
        ],
      },
    ],
  };

  return restoreWorkspace(emptyWorkJson);
}

/**
 * 恢复工作区
 * @param work - 工作区Json对象，一般是从数据库取出来
 */
export function restoreWorkspace(work: WorkJson): Work {
  const myWork = new Work({
    id: work.id,
    name: work.name,
    mode: work.mode,
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
