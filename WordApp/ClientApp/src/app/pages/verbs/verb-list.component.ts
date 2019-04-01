import { Component, ViewChild, OnInit } from '@angular/core';

import { VerbModel } from './../../models/verbs/verb.model';
import { WordModel } from './../../models/words/word.model';

import { VerbService } from './../../services/verb.service';
import { WordsService } from "./../../services/words.service";

import { VerbEditorFormComponent } from "./verb-editor-form.component";
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { CommonLoadingComponent } from './../../common/common-loading.component';

@Component({
  selector: 'verb-list',
  templateUrl: './verb-list.component.html',
})
export class VerbListComponent implements OnInit {
  public dataSource: MatTableDataSource<VerbModel>;
  private availableWords: Array<WordModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private verbsService: VerbService,
    private wordsService: WordsService,
    private dialog: MatDialog) { this.dialog.open(CommonLoadingComponent, {disableClose: true}) }

  ngOnInit(): void {
    this.wordsService.getWords().subscribe(result => {
      this.availableWords = result;
      this.dialog.closeAll();
    }, error => {this.dialog.closeAll();console.log(error);});

    this.verbsService.getVerbs().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<VerbModel>(result) : new MatTableDataSource<VerbModel>();
      this.dataSource.paginator = this.paginator;

    }, error => console.error(error));
  }

  public onShowEditorForm(verb: VerbModel) {
    var dialogRef = this.dialog.open(VerbEditorFormComponent, { data: { verb: verb ? verb : null, words: this.availableWords } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        verb ? this.edit(result as VerbModel) : this.create(result as VerbModel);
      }
    });
  }

  public onDelete(verb: VerbModel): void {
    this.verbsService.deleteVerb(verb).subscribe(e => {
      var index = this.dataSource.data.findIndex(w => w.id === e.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => console.error(error));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private create(verb: VerbModel) {
    this.verbsService.createVerb(verb).subscribe(result => {
      this.dataSource.data.push(result);
      this.resetDataSource();
    });
  }

  private edit(verb: VerbModel) {
    this.verbsService.updateVerb(verb).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1, result);
      this.resetDataSource();
    });
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<VerbModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }
}
