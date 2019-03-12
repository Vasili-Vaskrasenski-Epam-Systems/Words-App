import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { WordTaskService } from './../services/word-task.service';
import { WordsService } from './../../words/words.service';
import { IrregularVerbsService } from './../../irregular-verbs/irregular-verbs.service';
import { AlertService } from './../../alert/alert.service';

import { WordTaskModel } from './../models/word-task.model';
import { WordModel } from './../../words/word.model';
import { IrregularVerbModel } from './../../irregular-verbs/irregular-verb.model';
import { CommonSelectModel } from './../../common/select.component';

import { WordTaskEditorFormComponent } from './word-task-editor-form.component';

@Component(
  {
    selector: 'word-task-list',
    templateUrl: './word-task-list.component.html',
  })
export class WordTaskListComponent implements OnInit, AfterViewInit {
  public tasks: Array<WordTaskModel>;
  public displayContent: boolean;
  private existingWords: Array<WordModel>;
  private existingVerbs: Array<IrregularVerbModel>;

  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;

  constructor(private taskService: WordTaskService, private wordService: WordsService, private alertService: AlertService, private verbsService: IrregularVerbsService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    if (!this.tasks) {
      this.tasks = new Array<WordTaskModel>();
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
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(WordTaskEditorFormComponent);
  }

  onShowCreateForm(): void {
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
        this.tasks.push(result);
        console.log(result);
        this.clearForm();
      }, error => {
        this.alertService.error(error);
      });
    });
  }

  onShowEditForm(task: WordTaskModel): void {
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
        var index = this.tasks.findIndex(w => w.id === result.id);
        this.tasks.splice(index, 1, result);
        this.clearForm();
      }, error => console.error(error));
    });
  }

  onWordDelete(task: WordTaskModel): void {
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
