import { AssignVerbTaskModel } from './../../../models/tasks/verbs/assign-verb-task.model';
import { OrderedVerbTaskModel } from './../../../models/tasks/verbs/ordered-verb-task.model';


export class VerbTaskDetailModel {
  name: string;
  verbs: Array<OrderedVerbTaskModel>;
  assignees: Array<AssignVerbTaskModel>;
  id: string;
  rowVersion: string;

  constructor(name: string, verbs: Array<OrderedVerbTaskModel>, id: string, rowVersion: string) {
    this.name = name;
    this.verbs = verbs;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
