import { Component, Input, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver, AfterViewInit, EventEmitter, Output } from '@angular/core';

import { WordModel } from './../../words/word.model';
import { IrregularVerbModel } from './../irregular-verb.model';
import { IrregularVerbEditorFormComponent } from './irregular-verb-editor-form.component';

@Component({
  selector: "app-irregular-verb-editor",
  templateUrl: "./irregular-verb-editor.component.html",
})

export class IrregularVerbEditorComponent implements AfterViewInit {
  private componentFactory: any;
  @Input() existingWords: Array<WordModel>;
  @Input() verbObject: IrregularVerbModel;

  @Output() notifyAboutEdit: EventEmitter<IrregularVerbModel> = new EventEmitter<IrregularVerbModel>();
  @Output() notifyAboutDelete: EventEmitter<IrregularVerbModel> = new EventEmitter<IrregularVerbModel>();

  @ViewChild('editVerbFormContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('editBtn') editBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('deleteBtn') deleteBtn: ElementRef<HTMLButtonElement>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(IrregularVerbEditorFormComponent);
  }

  onShowVerbEditForm(): void {
    this.actWithButtons(true);
    var ref = this.container.createComponent(this.componentFactory);
    var instance = <IrregularVerbEditorFormComponent>ref.instance;
    instance.existingWords = this.existingWords;
    instance.setVerbs(this.verbObject);

    instance.notifyAboutCancel.subscribe(e => {
      this.container.clear();
      this.actWithButtons(false);
    });

    instance.notifyAboutConfirm.subscribe(e => {
      var instance = <IrregularVerbModel>e;

      //this.verbObject.commonWord = instance.commonWord;
      //this.verbObject.words = instance.words;

      this.container.clear();
      this.actWithButtons(false);
      this.notifyAboutEdit.emit(e);
    });
  }

  onVerbDelete(): void {
    this.notifyAboutDelete.emit(this.verbObject);
  }

  private actWithButtons(what: boolean) {
    this.editBtn.nativeElement.disabled = what;
    this.deleteBtn.nativeElement.disabled = what;
  }
}
