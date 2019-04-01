import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material";
import { VerbTaskDetailModel } from './../../../models/tasks/verbs/verb-task-detail.model';
import { AssignVerbTaskService } from './../../../services/tasks/assign-verb-task.service';
import { CommonLoadingComponent } from './../../../common/common-loading.component';

@Component({
  selector: 'verb-task-results',
  templateUrl: './verb-task-results.component.html',
})

export class VerbTaskResultsComponent implements OnInit {
  public completedTask: VerbTaskDetailModel;

  constructor(private assignTaskService: AssignVerbTaskService,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
    this.dialog.open(CommonLoadingComponent, { disableClose: true });
  }

  ngOnInit() {
    this.route.params.subscribe(e => {
      this.assignTaskService.getCompletedTask(e['id']).subscribe(data => {
        this.completedTask = data;
        this.dialog.closeAll();
      }, error => { this.dialog.closeAll(); console.log(error); });
    });
  }
}
