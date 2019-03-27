import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatePipe } from "@angular/common";

import { SentenceTaskService } from './../../../services/tasks/sentence-task.service';
import { AssignSentenceTaskService } from './../../../services/tasks/assign-sentence-task.service';

import { SentenceTaskDetailModel } from './../../../models/tasks/sentences/sentence-task-detail.model';
import { AssignSentenceTaskModel } from './../../../models/tasks/sentences/assign-sentence-task.model';
import { OrderedSentenceTaskModel } from './../../../models/tasks/sentences/ordered-sentence-task.model';

import { ETaskStatus } from './../../../app-enums';

@Component(
  {
    selector: 'sentence-task-details',
    templateUrl: './sentence-task-details.component.html',
  })
export class SentenceTaskDetailsComponent implements OnInit {
  public task: SentenceTaskDetailModel;
  public sentenceDataSource: MatTableDataSource<OrderedSentenceTaskModel>;
  public assigneeDataSource: MatTableDataSource<AssignSentenceTaskModel>;
  public taskStatuses = ETaskStatus;

  @ViewChild('sentencePaginator') verbsPaginator: MatPaginator;
  @ViewChild('assigneePaginator') assigneePaginator: MatPaginator;

  constructor(private route: ActivatedRoute, private sentenceTaskService: SentenceTaskService, private assignTaskService: AssignSentenceTaskService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.sentenceTaskService.getTaskDetails(e['id']).subscribe(data => {
        this.task = data;
        this.assigneeDataSource = new MatTableDataSource<AssignSentenceTaskModel>(this.task.assignees);
        this.assigneeDataSource.paginator = this.assigneePaginator;

        this.sentenceDataSource = new MatTableDataSource<OrderedSentenceTaskModel>(this.task.sentences);
        this.sentenceDataSource.paginator = this.verbsPaginator;
      });
    });
  }

  onUnAssign(assignedSentenceTaskModel: AssignSentenceTaskModel) {
    this.assignTaskService.unassignSentenceTask(assignedSentenceTaskModel).subscribe(e => {
      var index = this.assigneeDataSource.data.findIndex(t => t.id === e.id);
      this.assigneeDataSource.data.splice(index, 1);

      this.assigneeDataSource = new MatTableDataSource<AssignSentenceTaskModel>(this.assigneeDataSource.data);
      this.assigneeDataSource.paginator = this.assigneePaginator;
    },
      error => {

      });
  }

  applyVerbsFilter(filterValue: string) {
    this.sentenceDataSource.filterPredicate = (data: OrderedSentenceTaskModel, filter: string) => {
      const dataStr = data.sentence.text.toLowerCase() + data.order;
      return dataStr.indexOf(filter) !== -1;
    };
    this.sentenceDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyAssigneeFilter(filterValue: string) {
    this.assigneeDataSource.filterPredicate = (data: AssignSentenceTaskModel, filter: string) => {
      const dataStr = data.user.name.toLowerCase() + this.datePipe.transform(data.deadline, 'MMM d, y').toLowerCase() + data.taskStatus;
      return dataStr.indexOf(filter) !== -1;
    }

    this.assigneeDataSource.filter = filterValue.trim().toLowerCase();
  }
}


