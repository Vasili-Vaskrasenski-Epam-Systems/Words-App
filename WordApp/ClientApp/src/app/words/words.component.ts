import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';
import { WordModel } from './word.model';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
})
export class WordsComponent implements OnInit {
  private words: WordModel[];
  
  ngOnInit() {
    this.wordsService.getWords().subscribe(result => {
      this.words = result;
    }, error => console.error(error));
  };

  onWordAdd(): void {
    alert('One day add function will be added');
  }

  onWordEdit(word: WordModel): void {
    alert('edit' + word.word);
  }

  onWordDelete(word: WordModel): void {
    var index = this.words.findIndex(w => w.word === word.word);
    this.words.splice(index, 1);
    alert('delete' + word.word);
  }

  onWordCreate(word: WordModel): void {
    this.words.push(word);
  }


  constructor(public wordsService: WordsService) {
    
  }
}
