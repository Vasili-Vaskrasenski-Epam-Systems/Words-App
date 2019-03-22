import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatePipe } from "@angular/common";

import { VerbTaskService } from './../services/verb-task.service';
import { AssignVerbTaskService } from './../services/assign-verb-task.service';

import { VerbTaskDetailModel } from './../models/verb-task-detail.model';
import { AssignableVerbTaskModel } from './../models/assignable-verb-task.model';
import { OrderedVerbTaskModel } from './../models/ordered-verb-task.model';

import { Enums } from './../../app-enums';

@Component(
  {
    selector: 'verb-task-details',
    templateUrl: './verb-task-details.component.html',
  })
export class VerbTaskDetailsComponent implements OnInit {
  public task: VerbTaskDetailModel;
  public verbsDataSource: MatTableDataSource<OrderedVerbTaskModel>;
  public assigneeDataSource: MatTableDataSource<AssignableVerbTaskModel>;
  public taskStatuses = Enums.ETaskStatus;

  @ViewChild('verbsPaginator') verbsPaginator: MatPaginator;
  @ViewChild('assigneePaginator') assigneePaginator: MatPaginator;

  constructor(private route: ActivatedRoute, private verbTaskService: VerbTaskService, private assignTaskService: AssignVerbTaskService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.verbTaskService.getTaskDetails(e['id']).subscribe(data => {
        this.task = data;
        this.assigneeDataSource = new MatTableDataSource<AssignableVerbTaskModel>(this.task.assignees);
        this.assigneeDataSource.paginator = this.assigneePaginator;

        this.verbsDataSource = new MatTableDataSource<OrderedVerbTaskModel>(this.task.verbs);
        this.verbsDataSource.paginator = this.verbsPaginator;

        console.log(this.taskStatuses.Done);
      });
    });
  }

  onUnAssign(assignedVerbTaskModel: AssignableVerbTaskModel) {
    this.assignTaskService.unassignTask(assignedVerbTaskModel).subscribe(e => {
        var index = this.assigneeDataSource.data.findIndex(t => t.id === e.id);
      this.assigneeDataSource.data.splice(index, 1);

      this.assigneeDataSource = new MatTableDataSource<AssignableVerbTaskModel>(this.assigneeDataSource.data);
      this.assigneeDataSource.paginator = this.assigneePaginator;
      },
      error => {

      });
  }

  applyVerbsFilter(filterValue: string) {
    this.verbsDataSource.filterPredicate = (data: OrderedVerbTaskModel, filter: string) => {
      const dataStr = data.verb.commonWord.toLowerCase() + data.order;
      return dataStr.indexOf(filter) !== -1; 
    };
    this.verbsDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyAssigneeFilter(filterValue: string) {
    this.assigneeDataSource.filterPredicate = (data: AssignableVerbTaskModel, filter: string) => {
      const dataStr = data.user.name.toLowerCase() + this.datePipe.transform(data.deadline, 'MMM d, y').toLowerCase() + data.taskStatus;
      return dataStr.indexOf(filter) !== -1;
    }

    this.assigneeDataSource.filter = filterValue.trim().toLowerCase();
  }
}

