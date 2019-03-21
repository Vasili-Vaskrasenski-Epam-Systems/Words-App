import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

import { VerbTaskService } from './../services/verb-task.service';
import { VerbService } from './../../verbs/verb.service';
import { AlertService } from './../../alert/alert.service';
import { UserService } from './../../users/user.service';
import { AssignVerbTaskService } from './../services/assign-verb-task.service';

import { VerbTaskModel } from './../models/verb-task.model';
import { VerbModel } from './../../verbs/verb.model';
import { UserModel } from './../../users/user.model';
import { AssignableVerbTaskModel } from './../models/assignable-verb-task.model';

import { VerbTaskEditorFormComponent } from './verb-task-editor-form.component';

import { AssignTaskComponent, AssignableUserModel } from './../common/assign-task.component';

import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Enums } from './../../app-enums';
import { Constants } from './../../app-constants';

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
  
  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private verbTaskService: VerbTaskService, private alertService: AlertService, private verbsService: VerbService,
    private userService: UserService, private assignVerbTaskService: AssignVerbTaskService, private componentFactoryResolver: ComponentFactoryResolver) {
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

    this.userService.getUsersByType(Enums.EUserType[Enums.EUserType.Pupil]).subscribe(e => {
      this.availableUsers = e;
    });
  }

  onShowCreateForm(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerbTaskEditorFormComponent);
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <VerbTaskEditorFormComponent>ref.instance;

    instance.availableVerbs = new Array<VerbModel>(...this.availableVerbs);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.verbTaskService.createTask(e).subscribe(result => {
        this.dataSource.data.push(result);
        this.resetDataSource();
        this.clearForm();
      }, error => {
        this.alertService.error(error);
      });
    });
  }

  onShowEditForm(task: VerbTaskModel): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerbTaskEditorFormComponent);
    this.displayContent = false;
    this.showFormBtn.nativeElement.disabled = true;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <VerbTaskEditorFormComponent>ref.instance;
    instance.availableVerbs = new Array<VerbModel>(...this.availableVerbs);
    instance.setEditableObject(task);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.verbTaskService.updateTask(e).subscribe(result => {
        var index = this.dataSource.data.findIndex(w => w.id === result.id);
        this.dataSource.data.splice(index, 1, result);
        this.resetDataSource();
        this.clearForm();
      }, error => console.error(error));
    });
  }

  onShowAssignForm(task: VerbTaskModel): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(AssignTaskComponent);
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <AssignTaskComponent>ref.instance;
    instance.availableUsers = new Array<UserModel>(...this.availableUsers);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      var assignees = <Array<AssignableUserModel>>e;
      var assignObjects = new Array<AssignableVerbTaskModel>();

      for (var i = 0; i < assignees.length; i++) {
        assignObjects.push(new AssignableVerbTaskModel(task,
          assignees[i].user,
          null,
          assignees[i].deadline,
          null,
          null,
          Constants.guidEmpty,
          null));
      }

      this.assignVerbTaskService.assignTask(assignObjects).subscribe(s => {
          this.clearForm();
        },
        error => this.alertService.error(error));
    });
  }

  onDelete(task: VerbTaskModel): void {
    this.verbTaskService.deleteTask(task).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => {
      console.error(error);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<VerbTaskModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  private clearForm() {
    this.createFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}

