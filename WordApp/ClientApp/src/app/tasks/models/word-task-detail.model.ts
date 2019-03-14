import { AssignableWordTaskModel } from './../models/assignable-word-task.model';
import { OrderedWordTaskModel } from './../models/ordered-word-task.model';


export class WordTaskDetailModel {
  name: string;
  words: Array<OrderedWordTaskModel>;
  assignees: Array<AssignableWordTaskModel>;
  id: string;
  rowVersion: string;

  constructor(name: string, words: Array<OrderedWordTaskModel>, id: string, rowVersion: string) {
    this.name = name;
    this.words = words;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
