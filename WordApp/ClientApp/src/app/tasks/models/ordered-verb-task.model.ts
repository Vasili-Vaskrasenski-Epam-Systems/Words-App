import { VerbModel } from './../../models/verbs/verb.model';

export class OrderedVerbTaskModel {
  order: number;
  verb: VerbModel;
  id: string;
  rowVersion: string;

  constructor(order: number, verb: VerbModel, id: string, rowVersion: string) {
    this.id = id;
    this.rowVersion = rowVersion;
    this.order = order;
    this.verb = verb;
  }
}


