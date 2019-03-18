import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WordTaskService } from './../services/word-task.service';
import { AssignWordTaskService } from './../services/assign-word-task.service';

import { WordTaskDetailModel } from './../models/word-task-detail.model';
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';

@Component(
  {
    selector: 'word-task-details',
    templateUrl: './word-task-details.component.html',
  })
export class WordTaskDetailsComponent implements OnInit {
  public task: WordTaskDetailModel;

  constructor(private route: ActivatedRoute, private wordTaskService: WordTaskService, private assignTaskService: AssignWordTaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.wordTaskService.getTaskDetails(e['id']).subscribe(data => {
        this.task = data;
      });
    });
  }


  onUnAssign(wordModel: AssignableWordTaskModel) {
    this.assignTaskService.unassignWordTask(wordModel).subscribe(e => {
      var index = this.task.assignees.findIndex(t => t.id === e.id);
      this.task.assignees.splice(index, 1);
    },
      error => {

      });
  }
}
