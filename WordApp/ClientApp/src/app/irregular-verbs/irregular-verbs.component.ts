import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { IrregularVerbModel } from './irregular-verb.model';

import { IrregularVerbsService } from './irregular-verbs.service';

import { WordsService } from "./../words/words.service";

import { IrregularVerbEditorFormComponent } from "./irregular-verb-editor/irregular-verb-editor-form.component";

@Component({
  selector: 'app-irregular-verbs',
  templateUrl: './irregular-verbs.component.html',
})
export class IrregularVerbsComponent implements OnInit, AfterViewInit {
  private irregularVerbs: Array<IrregularVerbModel>;

  private componentFactory: any;
  @ViewChild('editVerbFormContainer', { read: ViewContainerRef }) editVerbFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;


  constructor(private irregularVerbsService: IrregularVerbsService, private wordsService: WordsService, private factoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.irregularVerbsService.getIrregularVerbs().subscribe(result => {
      this.irregularVerbs = result;
    }, error => console.error(error));
  }

  ngAfterViewInit(): void {
    this.componentFactory = this.factoryResolver.resolveComponentFactory(IrregularVerbEditorFormComponent);
  }

  onShowVerbCreateForm(): void {

    const words = this.wordsService.getWords().subscribe(e => {
      this.showFormBtn.nativeElement.disabled = true;
      var ref = this.editVerbFormContainer.createComponent(this.componentFactory);
      var instance = <IrregularVerbEditorFormComponent>ref.instance;

      instance.existingWords = e;

      instance.notifyAboutCancel.subscribe(e => {
        this.clearForm();
      });

      instance.notifyAboutConfirm.subscribe(e => {
        console.log(e);
        this.irregularVerbsService.createIrregularVerb(e).subscribe(ee => {
          this.clearForm();
        });
      });

    });
  }

  private clearForm() {
    this.editVerbFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
  }
}
