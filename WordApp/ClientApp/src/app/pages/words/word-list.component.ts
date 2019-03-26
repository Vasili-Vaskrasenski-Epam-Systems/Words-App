import { Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, ElementRef } from "@angular/core";
import { WordsService } from "./../../services/words.service";
import { WordModel } from "./../../models/words/word.model";
import { WordEditorFormComponent } from "./word-editor-form.component";
import { AlertService } from './../../alert/alert.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'word-list',
  templateUrl: './word-list.component.html',
})
export class WordListComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<WordModel>;
  public displayContent: boolean;
  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createWordFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private wordsService: WordsService, private componentFactoryResolver: ComponentFactoryResolver, private alertService: AlertService) {
    this.displayContent = true;
  }

  ngOnInit() {
    this.wordsService.getWords().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<WordModel>(result) : new MatTableDataSource<WordModel>();
      this.dataSource.paginator = this.paginator;
    }, error => console.error(error));
  };

  ngAfterViewInit(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(WordEditorFormComponent);
  }

  onWordEdit(word: WordModel): void {
    this.wordsService.updateWord(word).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1, result);
      this.clearForm();
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
      this.clearForm();
      }, error => this.alertService.error(error));
  }

  onShowWordCreateForm(): void {
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;
    var ref = this.createWordFormContainer.createComponent(this.componentFactory);
    var instance = <WordEditorFormComponent>ref.instance;

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.onWordCreate(e);
    });
  }

  onShowWordEdit(word: WordModel): void {
    this.displayContent = false;
    this.showFormBtn.nativeElement.disabled = true;

    var ref = this.createWordFormContainer.createComponent(this.componentFactory);
    var instance = <WordEditorFormComponent>ref.instance;

    instance.setWord(word);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.onWordEdit(e);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<WordModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  private clearForm() {
    this.createWordFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}
