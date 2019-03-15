import { Injectable } from '@angular/core';
import { WordTaskDetailModel } from './../tasks/models/word-task-detail.model';

@Injectable()
export class CustomWordTaskDetailsProvider {

  public storage: WordTaskDetailModel;

  public flush() {
    this.storage = null;
  }

}
