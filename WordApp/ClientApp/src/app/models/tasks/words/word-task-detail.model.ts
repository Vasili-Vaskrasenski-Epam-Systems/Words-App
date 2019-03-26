import { AssignWordTaskModel } from './../../../models/tasks/words/assign-word-task.model';
import { OrderedWordTaskModel } from './../../../models/tasks/words/ordered-word-task.model';


export class WordTaskDetailModel {
  name: string;
  words: Array<OrderedWordTaskModel>;
  assignees: Array<AssignWordTaskModel>;
  id: string;
  rowVersion: string;

  constructor(name: string, words: Array<OrderedWordTaskModel>, id: string, rowVersion: string) {
    this.name = name;
    this.words = words;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
