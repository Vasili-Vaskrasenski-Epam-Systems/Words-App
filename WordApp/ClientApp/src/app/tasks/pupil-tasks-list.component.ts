import { Component, OnInit } from '@angular/core';

import { AssignWordTaskService } from './services/assign-word-task.service';
import { AuthService } from './../auth/auth.service';

import { WordTaskDetailModel } from './models/word-task-detail.model';

import { CustomWordTaskDetailsProvider } from './../custom-providers/custom-word-task-details.provider';

@Component(
  {
    selector: 'pupil-task-list',
    templateUrl: './pupil-tasks-list.component.html',
  })
export class PupilTaskListComponent implements OnInit {
  public assignedWordTasks: Array<WordTaskDetailModel>;

  constructor(private authService: AuthService, private assignService: AssignWordTaskService, private  wordTaskDetailsProvider: CustomWordTaskDetailsProvider) {

  }

  ngOnInit(): void {
    var currentUserId = this.authService.currentUserValue.id;
    this.assignService.getPupilTasks(currentUserId).subscribe(e => {
      this.assignedWordTasks = e;
    });
  }

  public onStartTask(wordTask: WordTaskDetailModel) {
    this.wordTaskDetailsProvider.storage = wordTask;
  }
}
