import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { VerbModel } from './verb.model';
import { WordModel } from './../words/word.model';

import { VerbService } from './verb.service';

import { WordsService } from "./../words/words.service";

import { VerbEditorFormComponent } from "./verb-editor-form.component";

@Component({
  selector: 'verb-list',
  templateUrl: './verb-list.component.html',
})
export class VerbListComponent implements OnInit, AfterViewInit {
  public verbs: Array<VerbModel>;
  private availableWords: Array<WordModel>;
  public displayContent: boolean;

  private componentFactory: any;
  @ViewChild('editVerbFormContainer', { read: ViewContainerRef }) editVerbFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  
  constructor(private irregularVerbsService: VerbService, private wordsService: WordsService, private factoryResolver: ComponentFactoryResolver) {
    if (!this.verbs) {
      this.verbs = new Array<VerbModel>();
    }
    this.displayContent = true;
  }

  ngOnInit(): void {
    this.wordsService.getWords().subscribe(result => {
      this.availableWords = result;
    });

    this.irregularVerbsService.getVerbs().subscribe(result => {
      this.verbs = result;
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
          this.verbs.push(result);
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
      this.irregularVerbsService.updateVerb(e).subscribe(result => {
        var instance = <VerbModel>result;
        var verbToUpdate = this.verbs.find(w => w.id === instance.id);

        verbToUpdate.rowVersion = instance.rowVersion;
        verbToUpdate.words = instance.words;
        verbToUpdate.commonWord = instance.commonWord;

      }, error => console.error(error));
      this.clearForm();
    });
  }

  public onVerbDelete(verb: VerbModel): void {
    this.irregularVerbsService.deleteVerb(verb).subscribe(e => {
      var index = this.verbs.findIndex(w => w.id === e.id);
      this.verbs.splice(index, 1);
    }, error => console.error(error));
  }

  private clearForm(): void {
    this.editVerbFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}
