import { Component, OnInit } from '@angular/core';
import { WordsService } from './words.service';
import { WordEditorBtnBarComponent } from './word-editor/word-editor-btn-bar.component';

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

  onWordEdit(word: WordModel): void {
    console.log('edit');
  }

  onWordDelete(word: WordModel): void {
    console.log('delete');
  }


  constructor(public wordsService: WordsService) {
    
  }
}
