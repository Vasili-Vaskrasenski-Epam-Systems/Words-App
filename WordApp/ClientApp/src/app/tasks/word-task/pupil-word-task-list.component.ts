import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AssignWordTaskService } from './../services/assign-word-task.service';
import { AuthService } from './../../auth/auth.service';

import { AssignableWordTaskModel } from './../models/assignable-word-task.model';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Enums } from './../../app-enums';

@Component(
  {
    selector: 'pupil-word-task-list',
    templateUrl: './pupil-word-task-list.component.html',
  })
export class PupilWordTaskListComponent implements OnInit {
  public dataSource: MatTableDataSource<AssignableWordTaskModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public taskStatuses = Enums.ETaskStatus;

  constructor(private authService: AuthService, private assignWordTaskService: AssignWordTaskService, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    var currentUserId = this.authService.currentUserValue.id;

    this.assignWordTaskService.getPupilTasks(currentUserId).subscribe(e => {
      this.dataSource = new MatTableDataSource<AssignableWordTaskModel>(e);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: AssignableWordTaskModel, filter: string) => {
      const dataStr = data.wordTask.name.toLowerCase() + this.datePipe.transform(data.deadline, 'MMM d, y').toLowerCase() + data.wordTask.words.length + data.taskStatus;
      return dataStr.indexOf(filter) !== -1;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
