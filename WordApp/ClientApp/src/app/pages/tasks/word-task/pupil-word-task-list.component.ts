import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AssignWordTaskService } from './../../../services/tasks/assign-word-task.service';
import { AuthService } from './../../../auth/auth.service';

import { AssignWordTaskModel } from './../../../models/tasks/words/assign-word-task.model';

import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ETaskStatus } from './../../../app-enums';
import { CommonLoadingComponent } from './../../../common/common-loading.component';

@Component(
  {
    selector: 'pupil-word-task-list',
    templateUrl: './pupil-word-task-list.component.html',
  })
export class PupilWordTaskListComponent implements OnInit {
  public dataSource: MatTableDataSource<AssignWordTaskModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public taskStatuses = ETaskStatus;

  constructor(private authService: AuthService, private assignWordTaskService: AssignWordTaskService, private datePipe: DatePipe, private dialog: MatDialog) {
    this.dialog.open(CommonLoadingComponent, { disableClose: true });
  }

  ngOnInit(): void {
    var currentUserId = this.authService.currentUserValue.id;

    this.assignWordTaskService.getPupilTasks(currentUserId).subscribe(e => {
      this.dataSource = new MatTableDataSource<AssignWordTaskModel>(e);
      this.dataSource.paginator = this.paginator;
      this.dialog.closeAll();
    }, error => {this.dialog.closeAll(); console.log(error);});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: AssignWordTaskModel, filter: string) => {
      const dataStr = data.wordTask.name.toLowerCase() + this.datePipe.transform(data.deadline, 'MMM d, y').toLowerCase() + data.wordTask.words.length + data.taskStatus;
      return dataStr.indexOf(filter) !== -1;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
