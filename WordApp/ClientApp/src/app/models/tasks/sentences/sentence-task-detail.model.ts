import { AssignSentenceTaskModel } from './assign-sentence-task.model';
import { OrderedSentenceTaskModel } from './ordered-sentence-task.model';

export class SentenceTaskDetailModel {
  name: string;
  sentences: Array<OrderedSentenceTaskModel>;
  assignees: Array<AssignSentenceTaskModel>;
  id: string;
  rowVersion: string;

  constructor(name: string, sentences: Array<OrderedSentenceTaskModel>, id: string, rowVersion: string) {
    this.name = name;
    this.sentences = sentences;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}

