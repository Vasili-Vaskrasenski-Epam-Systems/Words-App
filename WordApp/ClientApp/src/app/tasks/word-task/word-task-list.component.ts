import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { WordTaskService } from './../services/word-task.service';
import { WordsService } from './../../services/words.service';
import { AlertService } from './../../alert/alert.service';
import { UserService } from './../../services/user.service';
import { AssignWordTaskService } from './../services/assign-word-task.service';

import { WordTaskModel } from './../models/word-task.model';
import { WordModel } from './../../models/words/word.model';
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';
import { UserModel } from './../../models/users/user.model';

import { WordTaskEditorFormComponent } from './word-task-editor-form.component';
import { AssignTaskComponent, AssignableUserModel } from './../common/assign-task.component';

import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Enums } from './../../app-enums';
import { Constants } from './../../app-constants';

@Component(
  {
    selector: 'word-task-list',
    templateUrl: './word-task-list.component.html',
  })
export class WordTaskListComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<WordTaskModel>;
  public displayContent: boolean;
  private existingWords: Array<WordModel>;
  private existingUsers: Array<UserModel>;

  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private taskService: WordTaskService,
    private wordService: WordsService,
    private alertService: AlertService,
    private userService: UserService,
    private assignWordTaskService: AssignWordTaskService,
    private componentFactoryResolver: ComponentFactoryResolver) {

    this.displayContent = true;
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<WordTaskModel>(result) : new MatTableDataSource<WordTaskModel>();
      this.dataSource.paginator = this.paginator;
    });

    this.wordService.getWords().subscribe(w => {
      this.existingWords = w;
    });

    this.userService.getUsersByType(Enums.EUserType[Enums.EUserType.Pupil]).subscribe(u => {
      this.existingUsers = u;
    });
  }

  ngAfterViewInit(): void {

  }

  onShowCreateForm(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(WordTaskEditorFormComponent);
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <WordTaskEditorFormComponent>ref.instance;

    instance.availableWords = new Array<WordModel>(...this.existingWords);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.taskService.createTask(e).subscribe(result => {
        this.dataSource.data.push(result);
        this.clearForm();
        this.resetDataSource();
      },
        error => {
          this.alertService.error(error);
        });
    });
  }

  onShowEditForm(task: WordTaskModel): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(WordTaskEditorFormComponent);
    this.displayContent = false;
    this.showFormBtn.nativeElement.disabled = true;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <WordTaskEditorFormComponent>ref.instance;
    instance.availableWords = new Array<WordModel>(...this.existingWords);
    instance.setEditableObject(task);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.taskService.updateTask(e).subscribe(result => {
        var index = this.dataSource.data.findIndex(w => w.id === result.id);
        this.dataSource.data.splice(index, 1, result);
        this.clearForm();
        this.resetDataSource();
      },
        error => console.error(error));
    });
  }

  onShowAssignForm(task: WordTaskModel): void {
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
      var assignObjects = new Array<AssignableWordTaskModel>();

      for (var i = 0; i < assignees.length; i++) {
        assignObjects.push(new AssignableWordTaskModel(task,
          assignees[i].user,
          null,
          assignees[i].deadline,
          null,
          null,
          Constants.guidEmpty,
          null));

        this.assignWordTaskService.assignTask(assignObjects).subscribe(s => {
          this.clearForm();
        },
          error => this.alertService.error(error));
      }
    });
  }

  onDelete(task: WordTaskModel): void {
    this.taskService.deleteTask(task).subscribe(result => {
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
    this.dataSource = new MatTableDataSource<WordTaskModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  private clearForm() {
    this.createFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}
