import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';

import { WordTaskService } from './../services/word-task.service';
import { AssignWordTaskService } from './../services/assign-word-task.service';

import { OrderedWordTaskModel } from './../models/ordered-word-task.model';
import { WordTaskDetailModel } from './../models/word-task-detail.model';
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';

import { Enums } from './../../app-enums';

@Component(
  {
    selector: 'word-task-details',
    templateUrl: './word-task-details.component.html',
  })
export class WordTaskDetailsComponent implements OnInit {
  public task: WordTaskDetailModel;
  public assigneeDataSource: MatTableDataSource<AssignableWordTaskModel>;
  public wordsDataSource: MatTableDataSource<OrderedWordTaskModel>;
  public taskStatuses = Enums.ETaskStatus;

  @ViewChild('wordsPaginator') wordsPaginator: MatPaginator;
  @ViewChild('assigneePaginator') assigneePaginator: MatPaginator;

  constructor(private route: ActivatedRoute, private wordTaskService: WordTaskService, private assignTaskService: AssignWordTaskService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.wordTaskService.getTaskDetails(e['id']).subscribe(data => {
        this.task = data;
        this.assigneeDataSource = new MatTableDataSource<AssignableWordTaskModel>(this.task.assignees);
        this.assigneeDataSource.paginator = this.assigneePaginator;

        this.wordsDataSource = new MatTableDataSource<OrderedWordTaskModel>(this.task.words);
        this.wordsDataSource.paginator = this.wordsPaginator;
      });
    });
  }

  onUnAssign(wordModel: AssignableWordTaskModel) {
    this.assignTaskService.unassignWordTask(wordModel).subscribe(e => {
      var index = this.assigneeDataSource.data.findIndex(t => t.id === e.id);
      this.assigneeDataSource.data.splice(index, 1);

      this.assigneeDataSource = new MatTableDataSource<AssignableWordTaskModel>(this.assigneeDataSource.data);
      this.assigneeDataSource.paginator = this.assigneePaginator;

    },
      error => {

      });
  }

  applyWordsFilter(filterValue: string) {
    this.wordsDataSource.filterPredicate = (data: OrderedWordTaskModel, filter: string) => {
      const dataStr = data.word.word.toLowerCase() + data.order;
      return dataStr.indexOf(filter) !== -1;
    };
    this.wordsDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyAssigneeFilter(filterValue: string) {
    this.assigneeDataSource.filterPredicate = (data: AssignableWordTaskModel, filter: string) => {
      const dataStr = data.user.name.toLowerCase() + this.datePipe.transform(data.deadline, 'MMM d, y').toLowerCase() + data.taskStatus;
      return dataStr.indexOf(filter) !== -1;
    }

    this.assigneeDataSource.filter = filterValue.trim().toLowerCase();
  }
}
