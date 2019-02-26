import { Component, Input, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { WordModel } from './../word.model';
import { WordEditorFormComponent } from './word-editor-form.component';

@Component({
  selector: "app-word-editor",
  templateUrl: "./word-editor.component.html",
  inputs: ['word', 'transcription', 'translation']
})

export class WordEditorComponent implements AfterViewInit {
  private componentFactory: any;
  @Input() wordObject: WordModel;
  @Output() notifyAboutEdit: EventEmitter<WordModel> = new EventEmitter<WordModel>();
  @Output() notifyAboutDelete: EventEmitter<WordModel> = new EventEmitter<WordModel>();
  
  @ViewChild('vcreditform', { read: ViewContainerRef }) vcrafdcc: ViewContainerRef;
  @ViewChild('editBtn') editBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('deleteBtn') deleteBtn: ElementRef<HTMLButtonElement>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(WordEditorFormComponent);
  }

  onShowWordEditForm(): void {
    this.actWithButtons(true);
    var ref = this.vcrafdcc.createComponent(this.componentFactory);
    var instance = <WordEditorFormComponent>ref.instance;
    instance.setWord(this.wordObject);

    instance.notifyAboutCancel.subscribe(e => {
      this.vcrafdcc.clear();
      this.actWithButtons(false);
      this.vcrafdcc.clear();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      var instance = <WordModel>e;
      this.wordObject.word = instance.word;
      this.wordObject.transcription = instance.transcription;
      this.wordObject.translation = instance.translation;
      
      this.vcrafdcc.clear();
      this.actWithButtons(false);
      this.notifyAboutEdit.emit(e);
    });
  }

  onWordDelete(): void {
    this.notifyAboutDelete.emit(this.wordObject);
  }

  private actWithButtons(what: boolean) {
    this.editBtn.nativeElement.disabled = what;
    this.deleteBtn.nativeElement.disabled = what;
  }
}
