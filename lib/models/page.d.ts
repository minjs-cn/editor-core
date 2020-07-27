import { PageConstructorConfig } from '../types';
import Element from './element';
declare class Page {
    name: string;
    readonly elements: Element[];
    get size(): number;
    constructor({ name }?: PageConstructorConfig);
    addChild(element: Element): this;
    removeChild(element: Element): this;
    removeChildByIndex(index: number): this;
    clone(): Page;
}
export default Page;
