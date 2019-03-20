import { Component, OnInit } from '@angular/core';
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';
import { AssignWordTaskService } from './../services/assign-word-task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'word-task-results',
  templateUrl: './word-task-results.component.html',
})

export class WordTaskResultsComponent implements OnInit {
  public completedTask: AssignableWordTaskModel;

  constructor(private assignTaskService: AssignWordTaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(e => {
      this.assignTaskService.getCompletedTask(e['id']).subscribe(data => {
        this.completedTask = data;
      });
    });
  }
}
