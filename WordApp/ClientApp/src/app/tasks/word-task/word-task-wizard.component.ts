import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AssignWordTaskService } from './../services/assign-word-task.service';
import { AlertService } from './../../alert/alert.service';

import { WordTaskModel } from './../models/word-task.model';
import { AnsweredWordModel } from './../models/answered-word.model';
import { TaskAnswerModel } from './../models/task-answer.model';
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';

import { CustomWordTaskDetailsProvider } from './../../custom-providers/custom-word-task-details.provider';
import { Router } from "@angular/router";


import { Enums } from './../../app-enums';
import { Constants } from './../../app-constants';

@Component(
  {
    selector: 'word-task-wizard',
    templateUrl: './word-task-wizard.component.html',
  })
export class WordTaskWizardComponent implements OnInit {
  public assignedWordTask: WordTaskModel;
  public answeredWordTask: AssignableWordTaskModel;
  public wizardForm: FormGroup;
  public wordIndex: number;
  public submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    private assignService: AssignWordTaskService,
    private wordTaskDetailsProvider: CustomWordTaskDetailsProvider,
    private alertService: AlertService,
    private router: Router) {
    this.wordIndex = 0;

    if (this.wordTaskDetailsProvider.storage)
      this.assignedWordTask = this.wordTaskDetailsProvider.storage.wordTask;

    }

  ngOnInit(): void {
    if (this.assignedWordTask) {
      console.log(this.assignedWordTask);
      this.answeredWordTask = this.wordTaskDetailsProvider.storage;
      this.assignedWordTask.words.sort((f, s) => f.order - s.order);
    } else {
      this.alertService.error("Looks like this page has been refreshed. Try to pass this task again from tasks page");
    }

    this.wizardForm = this.formBuilder.group({
      answer: ['', Validators.required],
    });
  }

  onBack() {
    if (this.wordIndex !== 0) {
      this.wordIndex--;
      this.handleWordSwap();
    }
  }

  onNext() {
    this.submitted = true;
    if (this.wordIndex !== this.assignedWordTask.words.length - 1 && !this.wizardForm.invalid) {
      this.handleAnswer();
      this.wordIndex++;
      this.submitted = false;
      this.handleWordSwap();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.wizardForm.invalid) {
      return;
    } else {
      this.handleAnswer();
    }
    this.answeredWordTask.taskStatus = Enums.ETaskStatus.Done;
    this.assignService.completeWordTask(this.answeredWordTask).subscribe(e => {
      this.router.navigate(['/pupil-tasks']);
    });
  }


  private handleWordSwap() {

    var existingAnswerIndex =
      this.answeredWordTask.answeredWords.findIndex(
        aw => aw.word.id === this.assignedWordTask.words[this.wordIndex].id && aw.answer !== null);
    if (existingAnswerIndex === -1) {
      this.wizardForm.reset();
    } else {
      this.wizardForm.controls.answer.setValue(this.answeredWordTask.answeredWords[existingAnswerIndex].answer.answer);
    }
  }

  private handleAnswer() {
    var answeredWord = new AnsweredWordModel(this.assignedWordTask.words[this.wordIndex].word,
      new TaskAnswerModel(this.wizardForm.controls.answer.value, Constants.guidEmpty, null));
    var existingAnswerIndex = this.answeredWordTask.answeredWords.findIndex(e => e.word.id === answeredWord.word.id);
    if (existingAnswerIndex !== -1) {
      this.answeredWordTask.answeredWords.splice(existingAnswerIndex, 1, answeredWord);
    } else {
      this.answeredWordTask.answeredWords.push(answeredWord);
    }
  }
}

