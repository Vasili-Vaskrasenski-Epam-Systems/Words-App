import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordModel } from './../../models/words/word.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Randomizer } from './../../infrastructure/helpers/randomizer';

@Component({
  selector: 'word-checker',
  templateUrl: './word-checker.component.html',
})
export class WordCheckerComponent implements OnInit {
  public wordsCheckForm: FormGroup;
  public words: WordModel[];
  private wordNumbers: number[];
  public currentWord: WordModel;
  public submitted: boolean;

  public isCorrect?: boolean;
  public isTranslation = null;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WordCheckerComponent>,
    private randomizer: Randomizer,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.words = this.data;

    this.wordsCheckForm = this.formBuilder.group({
      isTranslation: [false, Validators.required],
      answer: ['', Validators.required]
    });
  }

  public setTranslation() {
    this.isTranslation = this.wordsCheckForm.controls.isTranslation.value;
    this.wordNumbers = this.randomizer.getRandomArrayIndexes(this.words, this.words.length);
    this.updateWordNumber();
  }

  public checkWord() {
    this.submitted = true;

    if (this.wordsCheckForm.invalid) {
      return;
    }

    var answer = this.wordsCheckForm.controls.answer.value.trim();

    if (this.isTranslation) {
      this.isCorrect = this.currentWord.word.toLowerCase() === answer.toLowerCase();
    } else {
      this.isCorrect = false;
      var translations = this.currentWord.translation.split(',');
      for (var i = 0; i < translations.length; i++) {
        if (translations[i].trim().toLowerCase() === answer.toLowerCase()) {
          this.isCorrect = true;
          break;
        }
      }
    }
  }

  public onNext() {
    this.isCorrect = undefined;
    this.wordsCheckForm.controls.answer.setValue('');
    this.submitted = false;
    this.updateWordNumber();
  }

  private updateWordNumber(): void {
    this.currentWord = this.words[this.wordNumbers[0]];
    this.wordNumbers.splice(0, 1);
  }


}
