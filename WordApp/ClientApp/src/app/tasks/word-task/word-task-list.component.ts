import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { WordTaskService } from './../services/word-task.service';
import { WordsService } from './../../words/words.service';
import { IrregularVerbsService } from './../../irregular-verbs/irregular-verbs.service';
import { AlertService } from './../../alert/alert.service';
import { UserService } from './../../users/user.service';

import { WordTaskModel } from './../models/word-task.model';
import { WordModel } from './../../words/word.model';
import { IrregularVerbModel } from './../../irregular-verbs/irregular-verb.model';
import { CommonSelectModel } from './../../common/select.component';
import { UserModel } from './../../users/user.model';

import { WordTaskEditorFormComponent } from './word-task-editor-form.component';
import { AssignTaskComponent } from './../common/assign-task.component';

import { Enums } from './../../app-enums';

@Component(
  {
    selector: 'word-task-list',
    templateUrl: './word-task-list.component.html',
  })
export class WordTaskListComponent implements OnInit, AfterViewInit {
  public existingWordTasks: Array<WordTaskModel>;
  public displayContent: boolean;
  private existingWords: Array<WordModel>;
  private existingUsers: Array<UserModel>;
  //private existingVerbs: Array<IrregularVerbModel>;

  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;

  constructor(private taskService: WordTaskService, private wordService: WordsService, private alertService: AlertService, private verbsService: IrregularVerbsService,
    private userService: UserService, private componentFactoryResolver: ComponentFactoryResolver) {
    if (!this.existingWordTasks) {
      this.existingWordTasks = new Array<WordTaskModel>();
      this.displayContent = true;
    }
  }
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(t => {
      this.existingWordTasks = t;
    });

    this.wordService.getWords().subscribe(w => {
      this.existingWords = w;
    });

    //this.verbsService.getIrregularVerbs().subscribe(v => {
    //  this.existingVerbs = v;
    //});
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

    instance.existingWords = this.existingWords.map(word => new CommonSelectModel(word, word.word));

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.taskService.createTask(e).subscribe(result => {
        this.existingWordTasks.push(result);
        console.log(result);
        this.clearForm();
      }, error => {
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
    instance.existingWords = this.existingWords.map(word => new CommonSelectModel(word, word.word));
    instance.setEditableObject(task);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.taskService.updateTask(e).subscribe(result => {
        var index = this.existingWordTasks.findIndex(w => w.id === result.id);
        this.existingWordTasks.splice(index, 1, result);
        this.clearForm();
      }, error => console.error(error));
    });
  }

  onShowAssignForm(task: WordTaskModel): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(AssignTaskComponent);
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <AssignTaskComponent>ref.instance;
    instance.userList = this.existingUsers;

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      console.log('wordtasklist',e);
    });
  }

  onDelete(task: WordTaskModel): void {
    this.taskService.deleteTask(task).subscribe(result => {
      var index = this.existingWordTasks.findIndex(w => w.id === result.id);
      this.existingWordTasks.splice(index, 1);
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
