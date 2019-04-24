import { Component, OnInit, ViewChild } from "@angular/core";
import { WordsService } from "./../../services/words.service";
import { WordModel } from "./../../models/words/word.model";
import { WordEditorFormComponent } from "./word-editor-form.component";
import {WordCheckerComponent} from "./word-checker.component";
import { AlertService } from './../../alert/alert.service';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { CommonLoadingComponent } from './../../common/common-loading.component';

@Component({
  selector: 'word-list',
  templateUrl: './word-list.component.html',
})
export class WordListComponent implements OnInit {
  public dataSource: MatTableDataSource<WordModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private wordsService: WordsService,
    private alertService: AlertService,
    private dialog: MatDialog) {
    this.dialog.open(CommonLoadingComponent, { disableClose: true });
  }

  ngOnInit() {
    this.wordsService.getWords().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<WordModel>(result) : new MatTableDataSource<WordModel>();
      this.dataSource.paginator = this.paginator;
      this.dialog.closeAll();
    }, error => {this.dialog.closeAll(); console.error(error)});
  };

  public onDelete(word: WordModel): void {
    this.wordsService.deleteWord(word).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => console.error(error));
  }

  public onShowEditorForm(word: WordModel = null) {
    var dialogRef = this.dialog.open(WordEditorFormComponent, word ? { data: word } : null);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        word ? this.edit(result as WordModel) : this.create(result as WordModel);
      }
    });
  }

  onShowCheckWordsForm() {
    this.dialog.open(WordCheckerComponent, { data: this.dataSource.data });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private create(word: WordModel): void {
    this.wordsService.createWord(word).subscribe(result => {
      this.dataSource.data.push(result);
      this.resetDataSource();
    }, error => this.alertService.error(error));
  }

  private edit(word: WordModel): void {
    this.wordsService.updateWord(word).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1, result);
      this.resetDataSource();
    }, error => console.error(error));
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<WordModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }
}
