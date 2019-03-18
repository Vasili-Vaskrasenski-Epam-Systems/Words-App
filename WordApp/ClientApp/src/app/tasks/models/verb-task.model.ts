import { VerbModel } from './../../verbs/verb.model';

export class VerbTaskModel {
  name: string;
  verbs: Array<VerbModel>;
  id: string;
  rowVersion: string;

  constructor(name: string, verbs: Array<VerbModel>, id: string, rowVersion: string) {
    this.name = name;
    this.verbs = verbs;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}

