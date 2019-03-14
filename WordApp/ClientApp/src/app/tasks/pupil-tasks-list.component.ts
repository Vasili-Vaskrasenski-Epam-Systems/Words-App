import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { AssignWordTaskService } from './services/assign-word-task.service';
import { AuthService } from './../auth/auth.service';

import { WordTaskDetailModel } from './models/word-task-detail.model';

@Component(
  {
    selector: 'pupil-task-list',
    templateUrl: './pupil-tasks-list.component.html',
  })
export class PupilTaskListComponent implements OnInit {
  public assignedWordTasks: Array<WordTaskDetailModel>;
  private componentFactory: any;

  constructor(private authService: AuthService, private assignService: AssignWordTaskService) {

  }

  ngOnInit(): void {
    var currentUserId = this.authService.currentUserValue.id;
    this.assignService.getPupilTasks(currentUserId).subscribe(e => {
      this.assignedWordTasks = e;
    });
  }
}
