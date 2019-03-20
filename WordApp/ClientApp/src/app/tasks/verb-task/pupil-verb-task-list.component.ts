import { Component, OnInit, ViewChild } from '@angular/core';

import { AssignVerbTaskService } from './../services/assign-verb-task.service';
import { AuthService } from './../../auth/auth.service';

import { AssignableVerbTaskModel } from './../models/assignable-verb-task.model';

import { CustomWordTaskDetailsProvider } from './../../custom-providers/custom-word-task-details.provider';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component(
  {
    selector: 'pupil-verb-task-list',
    templateUrl: './pupil-verb-task-list.component.html',
  })
export class PupilVerbTaskListComponent implements OnInit {
  public dataSource: MatTableDataSource<AssignableVerbTaskModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authService: AuthService, private assignVerbTaskService: AssignVerbTaskService,
    private wordTaskDetailsProvider: CustomWordTaskDetailsProvider) {
  }

  ngOnInit(): void {
    var currentUserId = this.authService.currentUserValue.id;

    this.assignVerbTaskService.getPupilTasks(currentUserId).subscribe(e => {
      this.dataSource = new MatTableDataSource<AssignableVerbTaskModel>(e);
      this.dataSource.paginator = this.paginator;
    });
  }

  public onStartVerbTask(verbTask: AssignableVerbTaskModel) {
    this.wordTaskDetailsProvider.storage = verbTask;
  }
}

