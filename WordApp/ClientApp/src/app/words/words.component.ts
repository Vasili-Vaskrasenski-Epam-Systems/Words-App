import { Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, ElementRef } from "@angular/core";
import { WordsService } from "./words.service";
import { WordModel } from "./word.model";
import { WordEditorFormComponent } from "./word-editor-form.component";
import { AlertService } from './../alert/alert.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
})
export class WordsComponent implements OnInit, AfterViewInit {
  public words: WordModel[];
  public displayContent: boolean;
  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createWordFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  
  constructor(private wordsService: WordsService, private componentFactoryResolver: ComponentFactoryResolver, private alertService: AlertService) {
    if (!this.words) {
      this.words = new Array<WordModel>();
      this.displayContent = true;
    }
  }

  ngOnInit() {
    this.wordsService.getWords().subscribe(result => {
      this.words = result;
    }, error => console.error(error));
  };

  ngAfterViewInit(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(WordEditorFormComponent);
  }

  onWordEdit(word: WordModel): void {
    this.wordsService.updateWord(word).subscribe(result => {
      var index = this.words.findIndex(w => w.id === result.id);
      this.words.splice(index, 1, result);
      this.clearForm();
    }, error => console.error(error));
  }

  onWordDelete(word: WordModel): void {
    this.wordsService.deleteWord(word).subscribe(result => {
      var index = this.words.findIndex(w => w.id === result.id);
      this.words.splice(index, 1);
      }, error => console.error(error));
  }

  onWordCreate(word: WordModel): void {
    this.wordsService.createWord(word).subscribe(result => {
      this.words.push(result);
      this.clearForm();
      this.alertService.success("Word created!");
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

  private clearForm() {
    this.createWordFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}
