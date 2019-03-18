import { AssignableVerbTaskModel } from './../models/assignable-verb-task.model';
import { OrderedVerbTaskModel } from './../models/ordered-verb-task.model';


export class VerbTaskDetailModel {
  name: string;
  verbs: Array<OrderedVerbTaskModel>;
  assignees: Array<AssignableVerbTaskModel>;
  id: string;
  rowVersion: string;

  constructor(name: string, verbs: Array<OrderedVerbTaskModel>, id: string, rowVersion: string) {
    this.name = name;
    this.verbs = verbs;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
