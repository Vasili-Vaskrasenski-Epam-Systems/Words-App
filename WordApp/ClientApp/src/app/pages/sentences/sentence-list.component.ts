import { Component, ViewChild, OnInit } from '@angular/core';

import { SentenceModel } from './../../models/sentences/sentence.model';

import { SentenceService } from './../../services/sentence.service';

import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SentenceEditorFormComponent } from './sentence-editor-form.component';

import { CommonLoadingComponent } from './../../common/common-loading.component';

@Component({
  selector: 'sentence-list',
  templateUrl: './sentence-list.component.html',
})
export class SentenceListComponent implements OnInit {
  public dataSource: MatTableDataSource<SentenceModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private sentenceService: SentenceService) {
    this.dialog.open(CommonLoadingComponent, { disableClose: true });
  }

  ngOnInit(): void {
    this.sentenceService.getSentences().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<SentenceModel>(result) : new MatTableDataSource<SentenceModel>();
      this.dataSource.paginator = this.paginator;
      this.dialog.closeAll();
    }, error => { this.dialog.closeAll(); console.error(error)});
  }


  public onShowEditorForm(sentence: SentenceModel) {
    var dialogRef = this.dialog.open(SentenceEditorFormComponent, sentence ? { data: sentence } : null);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        sentence ? this.edit(result as SentenceModel) : this.create(result as SentenceModel);
      }
    });
  }

  public onDelete(sentence: SentenceModel): void {
    this.dialog.open(CommonLoadingComponent, { disableClose: true });
    this.sentenceService.deleteSentence(sentence).subscribe(e => {
      var index = this.dataSource.data.findIndex(w => w.id === e.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => console.error(error));
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private create(sentence: SentenceModel): void {
    this.sentenceService.createSentence(sentence).subscribe(result => {
      this.dataSource.data.push(result);
      this.resetDataSource();
    });
  }

  private edit(sentence: SentenceModel): void {
    this.sentenceService.updateSentence(sentence).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1, result);
      this.resetDataSource();

    }, error => console.error(error));
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<SentenceModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dialog.closeAll();
  }
}

