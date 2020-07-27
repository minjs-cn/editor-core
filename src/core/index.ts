import { WorkConstructorConfig } from 'src/types';
import Work from 'src/models/work';
import Page from 'src/models/page';
import Element from 'src/models/element';

export function createEmptyWork(work: WorkConstructorConfig) {
  const myWork = new Work({
    name: work.name,
  });

  const page = new Page();

  const element = new Element({
    name: 'Welcome',
  });

  page.addChild(element);

  myWork.addChild(page);

  return myWork;
}
