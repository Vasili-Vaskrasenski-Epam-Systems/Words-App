import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VerbTaskService } from './../services/verb-task.service';
import { AssignVerbTaskService } from './../services/assign-verb-task.service';

import { VerbTaskDetailModel } from './../models/verb-task-detail.model';
import { AssignableVerbTaskModel } from './../models/assignable-verb-task.model';

@Component(
  {
    selector: 'verb-task-details',
    templateUrl: './verb-task-details.component.html',
  })
export class VerbTaskDetailsComponent implements OnInit {
  public task: VerbTaskDetailModel;

  constructor(private route: ActivatedRoute, private verbTaskService: VerbTaskService, private assignTaskService: AssignVerbTaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.verbTaskService.getTaskDetails(e['id']).subscribe(data => {
        this.task = data;
      });
    });
  }

  onUnAssign(assignedVerbTaskModel: AssignableVerbTaskModel) {
    this.assignTaskService.unassignTask(assignedVerbTaskModel).subscribe(e => {
        var index = this.task.assignees.findIndex(t => t.id === e.id);
        this.task.assignees.splice(index, 1);
      },
      error => {

      });
  }
}

