import { Component, OnInit, ViewChild } from '@angular/core';

import { AssignWordTaskService } from './../services/assign-word-task.service';
import { AssignVerbTaskService } from './../services/assign-verb-task.service';
import { AuthService } from './../../auth/auth.service';

import { AssignableWordTaskModel } from './../models/assignable-word-task.model';

import { CustomWordTaskDetailsProvider } from './../../custom-providers/custom-word-task-details.provider';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component(
  {
    selector: 'pupil-word-task-list',
    templateUrl: './pupil-word-task-list.component.html',
  })
export class PupilWordTaskListComponent implements OnInit {
  public dataSource: MatTableDataSource<AssignableWordTaskModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authService: AuthService, private assignWordTaskService: AssignWordTaskService, private assignVerbTaskService: AssignVerbTaskService,
    private wordTaskDetailsProvider: CustomWordTaskDetailsProvider) {

  }

  ngOnInit(): void {
    var currentUserId = this.authService.currentUserValue.id;

    this.assignWordTaskService.getPupilTasks(currentUserId).subscribe(e => {
      this.dataSource = new MatTableDataSource<AssignableWordTaskModel>(e);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    });
  }

  public onStartWordTask(wordTask: AssignableWordTaskModel) {
    this.wordTaskDetailsProvider.storage = wordTask;
  }
}
