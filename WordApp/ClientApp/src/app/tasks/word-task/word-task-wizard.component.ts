import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AssignWordTaskService } from './../services/assign-word-task.service';
import { AlertService } from './../../alert/alert.service';

import { WordTaskDetailModel } from './../models/word-task-detail.model';
import { AnsweredWordModel } from './../models/answered-word.model';
import { TaskAnswerModel } from './../models/task-answer.model';
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';

import { CustomWordTaskDetailsProvider } from './../../custom-providers/custom-word-task-details.provider';
import { Router } from "@angular/router";


import { Enums } from './../../app-enums';

@Component(
  {
    selector: 'word-task-wizard',
    templateUrl: './word-task-wizard.component.html',
  })
export class WordTaskWizardComponent implements OnInit {
  public assignedWordTask: WordTaskDetailModel;
  public answeredWordTask: AssignableWordTaskModel;
  public wizardForm: FormGroup;
  public wordIndex: number;
  public submitted: boolean;

  @Input()
  taskDetailModel: WordTaskDetailModel;

  constructor(private formBuilder: FormBuilder,
    private assignService: AssignWordTaskService,
    private wordTaskDetailsProvider: CustomWordTaskDetailsProvider,
    private alertService: AlertService,
    private router: Router) {
    this.wordIndex = 0;
    this.assignedWordTask = this.wordTaskDetailsProvider.storage;
  }

  ngOnInit(): void {
    if (this.assignedWordTask) {
      this.answeredWordTask = this.wordTaskDetailsProvider.storage.assignees[0];
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
    console.log(this.answeredWordTask);
    this.assignService.completeWordTask(this.answeredWordTask).subscribe(e => {
      this.router.navigate(['/pupil-tasks']);
    });
  }


  private handleWordSwap() {

    var existingAnswerIndex =
      this.answeredWordTask.answeredWords.findIndex(
        aw => aw.word.id === this.assignedWordTask.words[this.wordIndex].word.id && aw.answer !== null);
    if (existingAnswerIndex === -1) {
      this.wizardForm.reset();
    } else {
      this.wizardForm.controls.answer.setValue(this.answeredWordTask.answeredWords[existingAnswerIndex].answer.answer);
    }
  }

  private handleAnswer() {
    var answeredWord = new AnsweredWordModel(this.assignedWordTask.words[this.wordIndex].word,
      new TaskAnswerModel(this.wizardForm.controls.answer.value, "00000000-0000-0000-0000-000000000000", null));
    var existingAnswerIndex = this.answeredWordTask.answeredWords.findIndex(e => e.word.id === answeredWord.word.id);
    if (existingAnswerIndex !== -1) {
      this.answeredWordTask.answeredWords.splice(existingAnswerIndex, 1, answeredWord);
    } else {
      this.answeredWordTask.answeredWords.push(answeredWord);
    }
  }
}

