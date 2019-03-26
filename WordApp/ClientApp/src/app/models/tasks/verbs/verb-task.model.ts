import { OrderedVerbTaskModel } from './ordered-verb-task.model';

export class VerbTaskModel {
  name: string;
  verbs: Array<OrderedVerbTaskModel>;
  id: string;
  rowVersion: string;

  constructor(name: string, verbs: Array<OrderedVerbTaskModel>, id: string, rowVersion: string) {
    this.name = name;
    this.verbs = verbs;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}

