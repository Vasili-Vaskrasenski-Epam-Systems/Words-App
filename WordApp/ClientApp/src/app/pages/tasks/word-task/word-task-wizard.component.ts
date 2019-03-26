import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AssignWordTaskService } from './../../../services/tasks/assign-word-task.service';
import { AuthService } from './../../../auth/auth.service';

import { WordTaskModel } from './../../../models/tasks/words/word-task.model';
import { AnsweredWordModel } from './../../../models/tasks/words/answered-word.model';
import { TaskAnswerModel } from './../../../models/tasks/task-answer.model';
import { AssignWordTaskModel } from './../../../models/tasks/words/assign-word-task.model';
import { UserModel } from './../../../models/users/user.model';

import { Router, ActivatedRoute } from "@angular/router";

import { Enums } from './../../../app-enums';
import { Constants } from './../../../app-constants';

@Component(
  {
    selector: 'word-task-wizard',
    templateUrl: './word-task-wizard.component.html',
  })
export class WordTaskWizardComponent implements OnInit {
  public assignedWordTask: WordTaskModel;
  public answeredWordTask: AssignWordTaskModel;
  public wizardForm: FormGroup;
  public wordIndex: number;
  public submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    private assignService: AssignWordTaskService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.wordIndex = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.assignService.getPupilTask(this.authService.currentUserValue.id, e["id"]).subscribe(task => {
        var taskInstance = (<AssignWordTaskModel>task);
        this.assignedWordTask = taskInstance.wordTask;
        this.answeredWordTask = task;
        this.answeredWordTask.user = new UserModel(null, null, Enums.EUserType.Pupil, this.authService.currentUserValue.id, null);
        this.assignedWordTask.words.sort((f, s) => f.order - s.order);
      });
    });

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
      this.router.navigate(['/pupil-word-tasks']);
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

