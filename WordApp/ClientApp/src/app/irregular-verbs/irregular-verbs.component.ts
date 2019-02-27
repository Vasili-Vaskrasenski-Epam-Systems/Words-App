import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { IrregularVerbModel } from './irregular-verb.model';
import { WordModel } from './../words/word.model';

import { IrregularVerbsService } from './irregular-verbs.service';

import { WordsService } from "./../words/words.service";

import { IrregularVerbEditorFormComponent } from "./irregular-verb-editor/irregular-verb-editor-form.component";

@Component({
  selector: 'app-irregular-verbs',
  templateUrl: './irregular-verbs.component.html',
})
export class IrregularVerbsComponent implements OnInit, AfterViewInit {
  private irregularVerbs: Array<IrregularVerbModel>;
  private availableWords: Array<WordModel>;

  private componentFactory: any;
  @ViewChild('editVerbFormContainer', { read: ViewContainerRef }) editVerbFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  
  constructor(private irregularVerbsService: IrregularVerbsService, private wordsService: WordsService, private factoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.wordsService.getWords().subscribe(result => {
      this.availableWords = result;
    });

    this.irregularVerbsService.getIrregularVerbs().subscribe(result => {
      this.irregularVerbs = result;
    }, error => console.error(error));
  }

  ngAfterViewInit(): void {
    this.componentFactory = this.factoryResolver.resolveComponentFactory(IrregularVerbEditorFormComponent);
  }

  onShowVerbCreateForm(): void {
   this.showFormBtn.nativeElement.disabled = true;
      var ref = this.editVerbFormContainer.createComponent(this.componentFactory);
      var instance = <IrregularVerbEditorFormComponent>ref.instance;
      instance.existingWords = this.availableWords;

      instance.notifyAboutCancel.subscribe(e => {
        this.clearForm();
      });

      instance.notifyAboutConfirm.subscribe(e => {
        console.log(e);
        this.irregularVerbsService.createIrregularVerb(e).subscribe(result => {
          this.irregularVerbs.push(result);
          this.clearForm();
        });
      });
  }

  onVerbEdit(verb: IrregularVerbModel): void {
    this.irregularVerbsService.updateIrregularVerb(verb).subscribe(result => {
      var instance = <IrregularVerbModel>result;
      var verbToUpdate = this.irregularVerbs.find(w => w.id === instance.id);

      verbToUpdate.rowVersion = instance.rowVersion;
      verbToUpdate.words = instance.words;
      verbToUpdate.commonWord = instance.commonWord;

    }, error => console.error(error));
  }

  onVerbDelete(verb: IrregularVerbModel): void {
    this.irregularVerbsService.deleteIrregularVerb(verb).subscribe(e => {
      var index = this.irregularVerbs.findIndex(w => w.id === e.id);
      this.irregularVerbs.splice(index, 1);
    }, error => console.error(error));
  }

  private clearForm(): void {
    this.editVerbFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
  }
}
