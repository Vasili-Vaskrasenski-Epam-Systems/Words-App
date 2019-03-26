import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { VerbModel } from './verb.model';
import { WordModel } from './../models/words/word.model';

import { VerbService } from './verb.service';
import { WordsService } from "./../services/words.service";

import { VerbEditorFormComponent } from "./verb-editor-form.component";
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'verb-list',
  templateUrl: './verb-list.component.html',
})
export class VerbListComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<VerbModel>;
  private availableWords: Array<WordModel>;
  public displayContent: boolean;

  private componentFactory: any;
  @ViewChild('editVerbFormContainer', { read: ViewContainerRef }) editVerbFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private irregularVerbsService: VerbService, private wordsService: WordsService, private factoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.wordsService.getWords().subscribe(result => {
      this.availableWords = result;

    });

    this.irregularVerbsService.getVerbs().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<VerbModel>(result) : new MatTableDataSource<VerbModel>();
      this.dataSource.paginator = this.paginator;
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
          this.dataSource.data.push(result);
          this.clearForm();
          this.resetDataSource();
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
        var verbToUpdate = this.dataSource.data.find(w => w.id === instance.id);

        verbToUpdate.rowVersion = instance.rowVersion;
        verbToUpdate.words = instance.words;
        verbToUpdate.commonWord = instance.commonWord;
        this.resetDataSource();
      }, error => console.error(error));
      this.clearForm();
    });
  }

  public onVerbDelete(verb: VerbModel): void {
    this.irregularVerbsService.deleteVerb(verb).subscribe(e => {
      var index = this.dataSource.data.findIndex(w => w.id === e.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => console.error(error));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<VerbModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  private clearForm(): void {
    this.editVerbFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}
