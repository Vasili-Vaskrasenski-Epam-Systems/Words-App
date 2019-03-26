import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AssignSentenceTaskService } from './../../services/tasks/assign-sentence-task.service';
import { AuthService } from './../../auth/auth.service';

import { AssignSentenceTaskModel } from './../../models/tasks/sentences/assign-sentence-task.model';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Enums } from './../../app-enums';

@Component(
  {
    selector: 'pupil-sentence-task-list',
    templateUrl: './pupil-sentence-task-list.component.html',
  })
export class PupilSentenceTaskListComponent implements OnInit {
  public dataSource: MatTableDataSource<AssignSentenceTaskModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public taskStatuses = Enums.ETaskStatus;

  constructor(private authService: AuthService, private assignSentenceTaskService: AssignSentenceTaskService, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    var currentUserId = this.authService.currentUserValue.id;

    this.assignSentenceTaskService.getPupilTasks(currentUserId).subscribe(e => {
      this.dataSource = new MatTableDataSource<AssignSentenceTaskModel>(e);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: AssignSentenceTaskModel, filter: string) => {
      const dataStr = data.sentenceTask.name.toLowerCase() + this.datePipe.transform(data.deadline, 'MMM d, y').toLowerCase() + data.sentenceTask.sentences.length + data.taskStatus;
      return dataStr.indexOf(filter) !== -1;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
