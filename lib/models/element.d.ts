import { ElementConstructorConfig } from '../types';
declare class Element {
    readonly id: number;
    readonly name: string;
    readonly elements: Element[];
    get size(): number;
    constructor({ name, id }: ElementConstructorConfig);
    addChild(element: Element): this;
    removeChild(element: Element): this;
    removeChildByIndex(index: number): this;
    clone(): Element;
}
export default Element;
