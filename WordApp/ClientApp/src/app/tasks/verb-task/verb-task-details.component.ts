import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { VerbTaskService } from './../services/verb-task.service';
import { AssignVerbTaskService } from './../services/assign-verb-task.service';

import { VerbTaskDetailModel } from './../models/verb-task-detail.model';
import { AssignableVerbTaskModel } from './../models/assignable-verb-task.model';
import { OrderedVerbTaskModel } from './../models/ordered-verb-task.model';

@Component(
  {
    selector: 'verb-task-details',
    templateUrl: './verb-task-details.component.html',
  })
export class VerbTaskDetailsComponent implements OnInit {
  public task: VerbTaskDetailModel;
  public verbsDataSource: MatTableDataSource<OrderedVerbTaskModel>;
  public assigneeDataSource: MatTableDataSource<AssignableVerbTaskModel>;

  @ViewChild('verbsPaginator') verbsPaginator: MatPaginator;
  @ViewChild('assigneePaginator') assigneePaginator: MatPaginator;

  constructor(private route: ActivatedRoute, private verbTaskService: VerbTaskService, private assignTaskService: AssignVerbTaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.verbTaskService.getTaskDetails(e['id']).subscribe(data => {
        this.task = data;
        this.assigneeDataSource = new MatTableDataSource<AssignableVerbTaskModel>(this.task.assignees);
        this.assigneeDataSource.paginator = this.assigneePaginator;

        this.verbsDataSource = new MatTableDataSource<OrderedVerbTaskModel>(this.task.verbs);
        this.verbsDataSource.paginator = this.verbsPaginator;
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
}

