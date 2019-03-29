import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';

import { VerbTaskService } from './../../../services/tasks/verb-task.service';
import { VerbService } from './../../../services/verb.service';
import { AlertService } from './../../../alert/alert.service';
import { UserService } from './../../../services/user.service';
import { AssignVerbTaskService } from './../../../services/tasks/assign-verb-task.service';

import { VerbTaskModel } from './../../../models/tasks/verbs/verb-task.model';
import { VerbModel } from './../../../models/verbs/verb.model';
import { UserModel } from './../../../models/users/user.model';
import { AssignVerbTaskModel } from './../../../models/tasks/verbs/assign-verb-task.model';

import { VerbTaskEditorFormComponent } from './verb-task-editor-form.component';

import { AssignTaskComponent, AssignableUserModel } from './../common/assign-task.component';

import { EUserType } from './../../../app-enums';
import { Constants } from './../../../app-constants';

@Component(
  {
    selector: 'verb-task-list',
    templateUrl: './verb-task-list.component.html',
  })
export class VerbTaskListComponent implements OnInit {
  public dataSource: MatTableDataSource<VerbTaskModel>;
  public availableVerbs: Array<VerbModel>;
  public availableUsers: Array<UserModel>;
  public displayContent: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private verbTaskService: VerbTaskService, private alertService: AlertService, private verbsService: VerbService,
    private userService: UserService, private assignVerbTaskService: AssignVerbTaskService, public dialog: MatDialog) {
    this.displayContent = true;
  }

  ngOnInit(): void {
    this.verbTaskService.getTasks().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<VerbTaskModel>(result) : new MatTableDataSource<VerbTaskModel>();
      this.dataSource.paginator = this.paginator;
    });

    this.verbsService.getVerbs().subscribe(e => {
      this.availableVerbs = e;
    });

    this.userService.getUsersByType(EUserType[EUserType.Pupil]).subscribe(e => {
      this.availableUsers = e;
    });
  }

  public onShowEditForm(task: VerbTaskModel): void {
    var dialogRef = this.dialog.open(VerbTaskEditorFormComponent,
      { data: { task: task, verbs: this.availableVerbs } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        task ? this.edit(result as VerbTaskModel) : this.create(result as VerbTaskModel);
      }
    });
  }

  public onShowAssignForm(task: VerbTaskModel): void {
    var dialogRef = this.dialog.open(AssignTaskComponent, { data: { users: this.availableUsers } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var assignees = <Array<AssignableUserModel>>result;
        var assignObjects = new Array<AssignVerbTaskModel>();

        for (var i = 0; i < assignees.length; i++) {
          assignObjects.push(new AssignVerbTaskModel(task,
            assignees[i].user,
            null,
            assignees[i].deadline,
            null,
            null,
            Constants.guidEmpty,
            null));
        }

        this.assignVerbTaskService.assignTask(assignObjects).subscribe(s => {
            //todo
          },
          error => this.alertService.error(error));
      }
    });
  }

  public onDelete(task: VerbTaskModel): void {
    this.verbTaskService.deleteTask(task).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => {
      console.error(error);
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<VerbTaskModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  private create(verbTask: VerbTaskModel) {
    this.verbTaskService.createTask(verbTask).subscribe(result => {
      this.dataSource.data.push(result);
      this.resetDataSource();
    }, error => {
      this.alertService.error(error);
    });
  }

  private edit(verbTask: VerbTaskModel) {
    this.verbTaskService.updateTask(verbTask).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1, result);
      this.resetDataSource();
    }, error => console.error(error));
  }
}

