import { Component, OnInit } from '@angular/core';
import { VerbTaskDetailModel } from './../../../models/tasks/verbs/verb-task-detail.model';
import { AssignVerbTaskService } from './../../../services/tasks/assign-verb-task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'verb-task-results',
  templateUrl: './verb-task-results.component.html',
})

export class VerbTaskResultsComponent implements OnInit {
  public completedTask: VerbTaskDetailModel;

  constructor(private assignTaskService: AssignVerbTaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(e => {
      this.assignTaskService.getCompletedTask(e['id']).subscribe(data => {
        this.completedTask = data;
      });
    });
  }
}
