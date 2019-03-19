import { Component, OnInit } from '@angular/core';
import { WordTaskDetailModel } from './../models/word-task-detail.model';
import { AssignWordTaskService } from './../services/assign-word-task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'word-task-results',
  templateUrl: './word-task-results.component.html',
})

export class WordTaskResultsComponent implements OnInit {
  public completedTask: WordTaskDetailModel;

  constructor(private assignTaskService: AssignWordTaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(e => {
      this.assignTaskService.getCompletedTask(e['id']).subscribe(data => {
        this.completedTask = data;
      });
    });
  }
}
