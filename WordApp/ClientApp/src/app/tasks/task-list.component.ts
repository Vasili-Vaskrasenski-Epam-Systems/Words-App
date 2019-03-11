import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { TaskService } from './task.service';
import { WordsService } from './../words/words.service';
import { IrregularVerbsService } from './../irregular-verbs/irregular-verbs.service';
import { AlertService } from './../alert/alert.service';

import { TaskModel } from './task.model';
import { WordModel } from './../words/word.model';
import { IrregularVerbModel } from './../irregular-verbs/irregular-verb.model';

import { TaskEditorFormComponent } from './task-editor-form.component';

@Component(
  {
    selector: 'task-list',
    templateUrl: './task-list.component.html',
  })
export class TaskListComponent implements OnInit, AfterViewInit {
  public tasks: Array<TaskModel>;
  public displayContent: boolean;
  private existingWords: Array<WordModel>;
  private existingVerbs: Array<IrregularVerbModel>;

  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;

  constructor(private taskService: TaskService, private wordService: WordsService, private alertService: AlertService, private verbsService: IrregularVerbsService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    if (!this.tasks) {
      this.tasks = new Array<TaskModel>();
      this.displayContent = true;
    }
  }
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(t => {
      this.tasks = t;
    });

    this.wordService.getWords().subscribe(w => {
      this.existingWords = w;
    });

    this.verbsService.getIrregularVerbs().subscribe(v => {
      this.existingVerbs = v;
    });
  }

  ngAfterViewInit(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(TaskEditorFormComponent);
  }

  onShowCreateForm(): void {
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <TaskEditorFormComponent>ref.instance;

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.taskService.createTask(e).subscribe(result => {
        this.tasks.push(result);
        this.clearForm();
      }, error => {
        this.alertService.error(error);
      });
    });
  }

  onShowEditForm(task: TaskModel): void {
    this.displayContent = false;
    this.showFormBtn.nativeElement.disabled = true;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <TaskEditorFormComponent>ref.instance;

    instance.setEditableObject(task);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.taskService.updateTask(e).subscribe(result => {
        var index = this.tasks.findIndex(w => w.id === result.id);

        this.tasks.splice(index, 1, result);
        this.clearForm();

      }, error => console.error(error));
    });
  }

  onWordDelete(task: TaskModel): void {
    this.taskService.deleteTask(task).subscribe(result => {
      var index = this.tasks.findIndex(w => w.id === result.id);
      this.tasks.splice(index, 1);
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
