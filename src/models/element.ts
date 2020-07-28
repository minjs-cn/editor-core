import { genUuid } from 'src/utils/uuid';
import { ElementConstructorConfig, ElementJson, ElementEditorProps, ElementProps, ElementEditorStyle } from 'src/types';

/**
 * 组件默认基本样式
 */
export function getElementEditorBasicStyle(): ElementEditorStyle {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 40,
    backgroundColor: '#fff',
  };
}

/**
 * 根据组件属性生成可编辑属性
 * @param props - 组件属性
 */
export function getElementEditorProps(props: ElementProps): ElementEditorProps {
  const editorProps: ElementEditorProps = {};

  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      if (typeof props[key] === 'function') {
        editorProps[key] = props[key]();
      } else {
        editorProps[key] = props[key];
      }
    }
  }

  return editorProps;
}
export class Element {
  /**
   * 组件唯一标识
   */
  readonly id: number;

  /**
   * 组件标签
   */
  readonly name: string;

  /**
   * 子组件
   */
  readonly elements: Element[] = [];

  /**
   * 子组件数量
   */
  get size() {
    return this.elements.length;
  }

  /**
   * 组件属性
   */
  readonly props: ElementProps = {};

  /**
   * 组件编辑属性
   */
  editorProps: ElementEditorProps;

  /**
   * 组件编辑基本样式
   */
  editorStyle: ElementEditorStyle;

  /**
   * 创建一个组件
   * @param param0 - 构造参数
   */
  constructor({ name, id, editorProps, props, editorStyle }: ElementConstructorConfig) {
    this.id = id || genUuid();
    this.name = name;
    this.props = props || {};
    this.editorProps = editorProps || getElementEditorProps(this.props);
    this.editorStyle = editorStyle || getElementEditorBasicStyle();
  }

  /**
   * 添加子组件
   * @param element - 子组件
   */
  addChild(element: Element) {
    this.elements.push(element);

    return this;
  }

  /**
   * 移除子组件
   * @param element - 子组件
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
   * 通过index移除子组件
   * @param index - 子组件在数组的index
   */
  removeChildByIndex(index: number) {
    this.elements.splice(index, 1);

    return this;
  }

  /**
   * 克隆当前组件，包括子组件
   */
  clone() {
    const element = new Element({
      name: this.name,
      editorStyle: {
        ...this.editorStyle,
      },
      props: this.props,
      editorProps: {
        ...this.editorProps,
      },
    });

    const elements = this.elements.map((ele): Element => ele.clone());

    elements.forEach((ele) => {
      element.addChild(ele);
    });

    return element;
  }

  /**
   * 当前组件信息转为Json对象
   */
  toJson(): ElementJson {
    const element: ElementJson = {
      id: this.id,
      name: this.name,
      elements: [],
      editorProps: this.editorProps,
      editorStyle: this.editorStyle,
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
