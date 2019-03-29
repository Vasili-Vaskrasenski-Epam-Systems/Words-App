import { Component, OnInit, ViewChild} from "@angular/core";
import { WordsService } from "./../../services/words.service";
import { WordModel } from "./../../models/words/word.model";
import { WordEditorFormComponent } from "./word-editor-form.component";
import { AlertService } from './../../alert/alert.service';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';

@Component({
  selector: 'word-list',
  templateUrl: './word-list.component.html',
})
export class WordListComponent implements OnInit {
  public dataSource: MatTableDataSource<WordModel>;
  public displayContent: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private wordsService: WordsService,
    private alertService: AlertService,
    private dialog: MatDialog) {
    this.displayContent = true;
  }

  ngOnInit() {
    this.wordsService.getWords().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<WordModel>(result) : new MatTableDataSource<WordModel>();
      this.dataSource.paginator = this.paginator;
    }, error => console.error(error));
  };

  onWordEdit(word: WordModel): void {
    this.wordsService.updateWord(word).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1, result);
      this.resetDataSource();
    }, error => console.error(error));
  }

  onWordDelete(word: WordModel): void {
    this.wordsService.deleteWord(word).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => console.error(error));
  }

  onWordCreate(word: WordModel): void {
    this.wordsService.createWord(word).subscribe(result => {
      this.dataSource.data.push(result);
      this.resetDataSource();
    }, error => this.alertService.error(error));
  }

  onShowWordCreateForm(): void {
    var dialogRef = this.dialog.open(WordEditorFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onWordCreate(result as WordModel);
      }
    });
  }

  onShowWordEdit(word: WordModel): void {
    var dialogRef = this.dialog.open(WordEditorFormComponent, {data: word});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onWordEdit(result as WordModel);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<WordModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }
}
