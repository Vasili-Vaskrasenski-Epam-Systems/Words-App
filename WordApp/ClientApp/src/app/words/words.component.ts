import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';
import { WordModel } from './word.model';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
})
export class WordsComponent implements OnInit {
  private words: WordModel[];
  private willAdd: boolean;
  
  ngOnInit() {
    this.wordsService.getWords().subscribe(result => {
      this.words = result;
    }, error => console.error(error));
  };

  onWordEdit(word: WordModel): void {
    this.wordsService.updateWord(word).subscribe(result => {
      //var index = this.words.findIndex(w => w.word === result.word);
      //this.words.splice(index, 1);
      //TODO need some logic for update properties on UI
    }, error => console.error(error));
  }

  onWordDelete(word: WordModel): void {
    console.log(word);
    this.wordsService.deleteWord(word).subscribe(result => {
      var index = this.words.findIndex(w => w.word === result.word);
      this.words.splice(index, 1);
    }, error => console.error(error));
  }

  onWordCreate(word: WordModel): void {
    this.wordsService.createWord(word).subscribe(result => {
      this.words.push(result);
      this.willAdd = false;
    },error => console.error(error));
  }

  onShowWordCreateForm(): void {
    this.willAdd = true;
  }

  onCancelWordCreate(): void {
    this.willAdd = false;
  }


  constructor(public wordsService: WordsService) {
    
  }
}
