import { Component, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';

import { AlertService } from './../../../alert/alert.service';
import { UserService } from './../../../services/user.service';
import { SentenceTaskService } from './../../../services/tasks/sentence-task.service';
import { AssignSentenceTaskService } from './../../../services/tasks/assign-sentence-task.service';
import { SentenceService } from './../../../services/sentence.service';

import { AssignSentenceTaskModel } from './../../../models/tasks/sentences/assign-sentence-task.model';
import { SentenceTaskModel } from './../../../models/tasks/sentences/sentence-task.model';
import { SentenceModel } from './../../../models/sentences/sentence.model';
import { UserModel } from './../../../models/users/user.model';

import { SentenceTaskEditorFormComponent } from './sentence-task-editor-form.component';
import { AssignTaskComponent, AssignableUserModel } from './../common/assign-task.component';

import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';

import { EUserType } from './../../../app-enums';
import { Constants } from './../../../app-constants';
import { CommonLoadingComponent } from './../../../common/common-loading.component';

@Component(
  {
    selector: 'sentence-task-list',
    templateUrl: './sentence-task-list.component.html',
  })
export class SentenceTaskListComponent implements OnInit {
  public dataSource: MatTableDataSource<SentenceTaskModel>;
  private existingSentences: Array<SentenceModel>;
  private existingUsers: Array<UserModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sentenceTaskService: SentenceTaskService,
    private alertService: AlertService,
    private userService: UserService,
    private sentenceService: SentenceService,
    private assignSentenceTaskService: AssignSentenceTaskService,
    public dialog: MatDialog) {
    this.dialog.open(CommonLoadingComponent, { disableClose: true });
  }

  ngOnInit(): void {
    this.sentenceTaskService.getSentenceTasks().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<SentenceTaskModel>(result) : new MatTableDataSource<SentenceTaskModel>();
      this.dataSource.paginator = this.paginator;
      this.dialog.closeAll();
    }, error => {this.dialog.closeAll(); console.log(error);});

    this.sentenceService.getSentences().subscribe(w => {
      this.existingSentences = w;
    });

    this.userService.getUsersByType(EUserType[EUserType.Pupil]).subscribe(u => {
      this.existingUsers = u;
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onShowEditForm(task: SentenceTaskModel = null): void {
    var dialogRef = this.dialog.open(SentenceTaskEditorFormComponent,
      { data: { task: task, sentences: this.existingSentences } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        task ? this.edit(result as SentenceTaskModel) : this.create(result as SentenceTaskModel);
      }
    });
  }

  public onDelete(task: SentenceTaskModel): void {
    this.sentenceTaskService.deleteSentenceTask(task).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => {
      console.error(error);
    });
  }

  public onShowAssignForm(task: SentenceTaskModel): void {
    var dialogRef = this.dialog.open(AssignTaskComponent, { data: { users: this.existingUsers } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var assignees = <Array<AssignableUserModel>>result;
        var assignObjects = new Array<AssignSentenceTaskModel>();

        for (var i = 0; i < assignees.length; i++) {
          assignObjects.push(new AssignSentenceTaskModel(task,
            assignees[i].user,
            null,
            assignees[i].deadline,
            null,
            null,
            Constants.guidEmpty,
            null));

          this.assignSentenceTaskService.assignSentenceTasks(assignObjects).subscribe(s => {
            //todo
          },
            error => this.alertService.error(error));
        }
      }
    });
  }

  private create(task: SentenceTaskModel) {
    this.sentenceTaskService.createSentenceTask(task).subscribe(result => {
      this.dataSource.data.push(result);
      this.resetDataSource();
    },
      error => {
        this.alertService.error(error);
      });
  }

  private edit(task: SentenceTaskModel) {
    this.sentenceTaskService.updateSentenceTask(task).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1, result);
      this.resetDataSource();
    },
      error => console.error(error));
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<SentenceTaskModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }
}
