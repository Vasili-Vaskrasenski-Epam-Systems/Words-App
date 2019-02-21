import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';

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


  constructor(public wordsService: WordsService) {
    
  }
}
