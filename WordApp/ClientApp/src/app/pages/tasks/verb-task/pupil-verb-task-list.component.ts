import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AssignVerbTaskService } from './../../../services/tasks/assign-verb-task.service';
import { AuthService } from './../../../auth/auth.service';

import { AssignVerbTaskModel } from './../../../models/tasks/verbs/assign-verb-task.model';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Enums } from './../../../app-enums';

@Component(
  {
    selector: 'pupil-verb-task-list',
    templateUrl: './pupil-verb-task-list.component.html',
  })
export class PupilVerbTaskListComponent implements OnInit {
  public dataSource: MatTableDataSource<AssignVerbTaskModel>;
  public taskStatuses = Enums.ETaskStatus;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authService: AuthService, private assignVerbTaskService: AssignVerbTaskService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    var currentUserId = this.authService.currentUserValue.id;

    this.assignVerbTaskService.getPupilTasks(currentUserId).subscribe(e => {
      this.dataSource = new MatTableDataSource<AssignVerbTaskModel>(e);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: AssignVerbTaskModel, filter: string) => {
      const dataStr = data.verbTask.name.toLowerCase() + this.datePipe.transform(data.deadline, 'MMM d, y').toLowerCase() + data.verbTask.verbs.length + data.taskStatus;
      return dataStr.indexOf(filter) !== -1;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

