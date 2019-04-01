import { Component, OnInit } from '@angular/core';
import { AssignSentenceTaskModel } from './../../../models/tasks/sentences/assign-sentence-task.model';
import { AssignSentenceTaskService } from './../../../services/tasks/assign-sentence-task.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CommonLoadingComponent } from './../../../common/common-loading.component';

@Component({
  selector: 'sentence-task-results',
  templateUrl: './sentence-task-results.component.html',
})

export class SentenceTaskResultsComponent implements OnInit {
  public completedTask: AssignSentenceTaskModel;

  constructor(private assignTaskService: AssignSentenceTaskService,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
    this.dialog.open(CommonLoadingComponent, { disableClose: true });
  }

  ngOnInit() {
    this.route.params.subscribe(e => {
      this.assignTaskService.getCompletedTask(e['id']).subscribe(data => {
        this.completedTask = data;
        this.dialog.closeAll();
      }, error => {this.dialog.closeAll();console.log(error);});
      
    });
  }
}

