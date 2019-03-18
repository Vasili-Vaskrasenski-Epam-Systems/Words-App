import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { VerbModel } from './verb.model';
import { WordModel } from './../words/word.model';

import { VerbService } from './verb.service';

import { WordsService } from "./../words/words.service";

import { VerbEditorFormComponent } from "./verb-editor/verb-editor-form.component";

@Component({
  selector: 'verb-list',
  templateUrl: './verb-list.component.html',
})
export class VerbListComponent implements OnInit, AfterViewInit {
  public irregularVerbs: Array<VerbModel>;
  private availableWords: Array<WordModel>;
  public displayContent: boolean;

  private componentFactory: any;
  @ViewChild('editVerbFormContainer', { read: ViewContainerRef }) editVerbFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  
  constructor(private irregularVerbsService: VerbService, private wordsService: WordsService, private factoryResolver: ComponentFactoryResolver) {
    if (!this.irregularVerbs) {
      this.irregularVerbs = new Array<VerbModel>();
    }
    this.displayContent = true;
  }

  ngOnInit(): void {
    this.wordsService.getWords().subscribe(result => {
      this.availableWords = result;
    });

    this.irregularVerbsService.getVerbs().subscribe(result => {
      this.irregularVerbs = result;
    }, error => console.error(error));
  }

  ngAfterViewInit(): void {
    this.componentFactory = this.factoryResolver.resolveComponentFactory(VerbEditorFormComponent);
  }

  public onShowVerbCreateForm(): void {
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;
      var ref = this.editVerbFormContainer.createComponent(this.componentFactory);
      var instance = <VerbEditorFormComponent>ref.instance;
      instance.existingWords = this.availableWords;

      instance.notifyAboutCancel.subscribe(e => {
        this.clearForm();
      });

      instance.notifyAboutConfirm.subscribe(e => {
        this.irregularVerbsService.createVerb(e).subscribe(result => {
          this.irregularVerbs.push(result);
          this.clearForm();
        });
      });
  }

  onShowVerbEdit(verb: VerbModel): void {
    this.displayContent = false;
    this.showFormBtn.nativeElement.disabled = true;

    var ref = this.editVerbFormContainer.createComponent(this.componentFactory);
    var instance = <VerbEditorFormComponent>ref.instance;

    instance.existingWords = this.availableWords;
    instance.setVerbs(verb);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.irregularVerbsService.updateVerb(verb).subscribe(result => {
        var instance = <VerbModel>result;
        var verbToUpdate = this.irregularVerbs.find(w => w.id === instance.id);

        verbToUpdate.rowVersion = instance.rowVersion;
        verbToUpdate.words = instance.words;
        verbToUpdate.commonWord = instance.commonWord;

      }, error => console.error(error));
      this.clearForm();
    });
  }

  public onVerbDelete(verb: VerbModel): void {
    this.irregularVerbsService.deleteVerb(verb).subscribe(e => {
      var index = this.irregularVerbs.findIndex(w => w.id === e.id);
      this.irregularVerbs.splice(index, 1);
    }, error => console.error(error));
  }

  private clearForm(): void {
    this.editVerbFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}
