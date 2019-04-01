import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material";
import { AssignWordTaskModel } from './../../../models/tasks/words/assign-word-task.model';
import { AssignWordTaskService } from './../../../services/tasks/assign-word-task.service';
import { CommonLoadingComponent } from './../../../common/common-loading.component';

@Component({
  selector: 'word-task-results',
  templateUrl: './word-task-results.component.html',
})

export class WordTaskResultsComponent implements OnInit {
  public completedTask: AssignWordTaskModel;

  constructor(private assignTaskService: AssignWordTaskService,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
    this.dialog.open(CommonLoadingComponent, { disableClose: true });
  }

  ngOnInit() {
    this.route.params.subscribe(e => {
      this.assignTaskService.getCompletedTask(e['id']).subscribe(data => {
        this.completedTask = data;
        this.dialog.closeAll();
      }, error => {console.log(error); this.dialog.closeAll();});
    });
  }
}
