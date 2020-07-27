import { WorkConstructorConfig } from '../types';
import Page from './page';
declare class Work {
    readonly id: number;
    name: string;
    readonly elements: Page[];
    get size(): number;
    constructor({ id, name }?: WorkConstructorConfig);
    addChild(page: Page): this;
    removeChild(element: Page): this;
    removeChildByIndex(index: number): this;
    canRemove(): boolean;
    clone(): Work;
}
export default Work;
