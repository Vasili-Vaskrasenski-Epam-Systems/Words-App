import { Component, OnInit } from '@angular/core';
import { AssignSentenceTaskModel } from './../../models/tasks/sentences/assign-sentence-task.model';
import { AssignSentenceTaskService } from './../../services/tasks/assign-sentence-task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sentence-task-results',
  templateUrl: './sentence-task-results.component.html',
})

export class SentenceTaskResultsComponent implements OnInit {
  public completedTask: AssignSentenceTaskModel;

  constructor(private assignTaskService: AssignSentenceTaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(e => {
      this.assignTaskService.getCompletedTask(e['id']).subscribe(data => {
        this.completedTask = data;
      });
    });
  }
}

