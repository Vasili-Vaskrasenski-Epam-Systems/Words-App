import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

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

import { MatPaginator, MatTableDataSource } from '@angular/material';

import { EUserType } from './../../../app-enums';
import { Constants } from './../../../app-constants';

@Component(
  {
    selector: 'sentence-task-list',
    templateUrl: './sentence-task-list.component.html',
  })
export class SentenceTaskListComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<SentenceTaskModel>;
  public displayContent: boolean;
  private existingSentences: Array<SentenceModel>;
  private existingUsers: Array<UserModel>;

  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sentenceTaskService: SentenceTaskService,
    private alertService: AlertService,
    private userService: UserService,
    private sentenceService: SentenceService,
    private assignSentenceTaskService:AssignSentenceTaskService,
    private componentFactoryResolver: ComponentFactoryResolver) {

    this.displayContent = true;
  }

  ngOnInit(): void {
    this.sentenceTaskService.getSentenceTasks().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<SentenceTaskModel>(result) : new MatTableDataSource<SentenceTaskModel>();
      this.dataSource.paginator = this.paginator;
    });

    this.sentenceService.getSentences().subscribe(w => {
      this.existingSentences = w;
    });

    this.userService.getUsersByType(EUserType[EUserType.Pupil]).subscribe(u => {
      this.existingUsers = u;
    });
  }

  ngAfterViewInit(): void {

  }

  onShowCreateForm(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(SentenceTaskEditorFormComponent);
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <SentenceTaskEditorFormComponent>ref.instance;

    instance.availableSentences = new Array<SentenceModel>(...this.existingSentences);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.sentenceTaskService.createSentenceTask(e).subscribe(result => {
        this.dataSource.data.push(result);
        this.clearForm();
        this.resetDataSource();
      },
        error => {
          this.alertService.error(error);
        });
    });
  }

  onShowEditForm(task: SentenceTaskModel): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(SentenceTaskEditorFormComponent);
    this.displayContent = false;
    this.showFormBtn.nativeElement.disabled = true;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <SentenceTaskEditorFormComponent>ref.instance;
    instance.availableSentences = new Array<SentenceModel>(...this.existingSentences);
    instance.setEditableObject(task);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.sentenceTaskService.updateSentenceTask(e).subscribe(result => {
        var index = this.dataSource.data.findIndex(w => w.id === result.id);
        this.dataSource.data.splice(index, 1, result);
        this.clearForm();
        this.resetDataSource();
      },
        error => console.error(error));
    });
  }

  onShowAssignForm(task: SentenceTaskModel): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(AssignTaskComponent);
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <AssignTaskComponent>ref.instance;
    instance.availableUsers = new Array<UserModel>(...this.existingUsers);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      var assignees = <Array<AssignableUserModel>>e;
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
          this.clearForm();
        },
          error => this.alertService.error(error));
      }
    });
  }

  onDelete(task: SentenceTaskModel): void {
    this.sentenceTaskService.deleteSentenceTask(task).subscribe(result => {
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
    this.dataSource = new MatTableDataSource<SentenceTaskModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  private clearForm() {
    this.createFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}
