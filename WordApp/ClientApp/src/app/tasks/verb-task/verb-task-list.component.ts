import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { VerbTaskService } from './../services/verb-task.service';
import { WordsService } from './../../words/words.service';
import { VerbService } from './../../verbs/verb.service';
import { AlertService } from './../../alert/alert.service';
import { UserService } from './../../users/user.service';
import { AssignWordTaskService } from './../services/assign-word-task.service';

import { WordTaskModel } from './../models/word-task.model';
import { VerbTaskModel } from './../models/verb-task.model';
import { WordModel } from './../../words/word.model';
import { VerbModel } from './../../verbs/verb.model';
import { UserModel } from './../../users/user.model';

import { VerbTaskEditorFormComponent } from './verb-task-editor-form.component';

import { AssignTaskComponent } from './../common/assign-task.component';

import { Enums } from './../../app-enums';

@Component(
  {
    selector: 'verb-task-list',
    templateUrl: './verb-task-list.component.html',
  })
export class VerbTaskListComponent implements OnInit, AfterViewInit {
  public existingVerbTasks: Array<VerbTaskModel>;
  public availableVerbs: Array<VerbModel>;
  public displayContent: boolean;
  
  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;

  constructor(private verbTaskService: VerbTaskService, private wordService: WordsService, private alertService: AlertService, private verbsService: VerbService,
    private userService: UserService, private assignWordTaskService: AssignWordTaskService, private componentFactoryResolver: ComponentFactoryResolver) {
    if (!this.existingVerbTasks) {
      this.existingVerbTasks = new Array<VerbTaskModel>();
      this.displayContent = true;
    }
  }

  ngOnInit(): void {
    this.verbTaskService.getTasks().subscribe(t => {
      this.existingVerbTasks = t;
    });

    this.verbsService.getVerbs().subscribe(e => {
      this.availableVerbs = e;
    });
  }

  ngAfterViewInit(): void {

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
        this.existingVerbTasks.push(result);
        console.log(result);
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
        var index = this.existingVerbTasks.findIndex(w => w.id === result.id);
        this.existingVerbTasks.splice(index, 1, result);
        this.clearForm();
      }, error => console.error(error));
    });
  }

  onShowAssignForm(task: VerbTaskModel): void {
    
  }

  onDelete(task: VerbTaskModel): void {
    this.verbTaskService.deleteTask(task).subscribe(result => {
      var index = this.existingVerbTasks.findIndex(w => w.id === result.id);
      this.existingVerbTasks.splice(index, 1);
    }, error => {
      console.error(error);
    });
  }

  private clearForm() {
    this.createFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}

