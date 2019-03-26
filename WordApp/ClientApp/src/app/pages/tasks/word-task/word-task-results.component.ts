import { Component, OnInit } from '@angular/core';
import { AssignWordTaskModel } from './../../../models/tasks/words/assign-word-task.model';
import { AssignWordTaskService } from './../../../services/tasks/assign-word-task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'word-task-results',
  templateUrl: './word-task-results.component.html',
})

export class WordTaskResultsComponent implements OnInit {
  public completedTask: AssignWordTaskModel;

  constructor(private assignTaskService: AssignWordTaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(e => {
      this.assignTaskService.getCompletedTask(e['id']).subscribe(data => {
        this.completedTask = data;
      });
    });
  }
}
