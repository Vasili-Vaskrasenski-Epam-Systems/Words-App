import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { SentenceModel } from './../../models/sentences/sentence.model';

import { SentenceService } from './../../services/sentence.service';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SentenceEditorFormComponent } from './sentence-editor-form.component';

@Component({
  selector: 'sentence-list',
  templateUrl: './sentence-list.component.html',
})
export class SentenceListComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<SentenceModel>;
  public displayContent: boolean;
  private componentFactory: any;

  @ViewChild('editFormContainer', { read: ViewContainerRef }) editVerbFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private factoryResolver: ComponentFactoryResolver, private sentenceService: SentenceService) { }

  ngOnInit(): void {
    this.sentenceService.getSentences().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<SentenceModel>(result) : new MatTableDataSource<SentenceModel>();
      this.dataSource.paginator = this.paginator;
    }, error => console.error(error));
  }

  ngAfterViewInit(): void {
    this.componentFactory = this.factoryResolver.resolveComponentFactory(SentenceEditorFormComponent);
  }

  public onShowCreateForm(): void {
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;

    var ref = this.editVerbFormContainer.createComponent(this.componentFactory);
    var instance = <SentenceEditorFormComponent>ref.instance;
    
    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.sentenceService.createSentence(e).subscribe(result => {
        this.dataSource.data.push(result);
        this.clearForm();
        this.resetDataSource();
      });
    });
  }

  onShowEditForm(sentence: SentenceModel): void {
    this.displayContent = false;
    this.showFormBtn.nativeElement.disabled = true;

    var ref = this.editVerbFormContainer.createComponent(this.componentFactory);
    var instance = <SentenceEditorFormComponent>ref.instance;
    instance.setEditableObject(sentence);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.sentenceService.updateSentence(e).subscribe(result => {
        var index = this.dataSource.data.findIndex(w => w.id === result.id);
        this.dataSource.data.splice(index, 1, result);
        this.resetDataSource();

      }, error => console.error(error));
      this.clearForm();
    });
  }

  public onSentenceDelete(sentence: SentenceModel): void {
    this.sentenceService.deleteSentence(sentence).subscribe(e => {
      var index = this.dataSource.data.findIndex(w => w.id === e.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => console.error(error));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<SentenceModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  private clearForm(): void {
    this.editVerbFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}

