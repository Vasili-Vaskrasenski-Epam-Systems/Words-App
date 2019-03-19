import { Component, OnInit } from '@angular/core';

import { AssignWordTaskService } from './services/assign-word-task.service';
import { AssignVerbTaskService } from './services/assign-verb-task.service';
import { AuthService } from './../auth/auth.service';

import { AssignableVerbTaskModel } from './models/assignable-verb-task.model';
import { AssignableWordTaskModel } from './models/assignable-word-task.model';
import { WordTaskDetailModel } from './models/word-task-detail.model';

import { CustomWordTaskDetailsProvider } from './../custom-providers/custom-word-task-details.provider';

@Component(
  {
    selector: 'pupil-task-list',
    templateUrl: './pupil-tasks-list.component.html',
  })
export class PupilTaskListComponent implements OnInit {
  public assignedWordTasks: Array<WordTaskDetailModel>;
  public assignedVerbTasks: Array<AssignableVerbTaskModel>;

  constructor(private authService: AuthService, private assignWordTaskService: AssignWordTaskService, private assignVerbTaskService: AssignVerbTaskService,
    private wordTaskDetailsProvider: CustomWordTaskDetailsProvider) {

  }

  ngOnInit(): void {
    var currentUserId = this.authService.currentUserValue.id;

    this.assignWordTaskService.getPupilTasks(currentUserId).subscribe(e => {
      this.assignedWordTasks = e;
    });

    this.assignVerbTaskService.getPupilTasks(currentUserId).subscribe(e => {
      this.assignedVerbTasks = e;
    });
  }

  public onStartWordTask(wordTask: AssignableWordTaskModel) {
    this.wordTaskDetailsProvider.storage = wordTask;
  }

  public onStartVerbTask(verbTask: AssignableVerbTaskModel) {
    this.wordTaskDetailsProvider.storage = verbTask;
  }
}
