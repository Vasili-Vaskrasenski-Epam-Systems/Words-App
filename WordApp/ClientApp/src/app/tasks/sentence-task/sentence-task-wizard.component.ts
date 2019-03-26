import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AssignSentenceTaskService } from './../../services/tasks/assign-sentence-task.service';
import { AuthService } from './../../auth/auth.service';

import { SentenceTaskModel } from './../../models/tasks/sentences/sentence-task.model';
import { AssignSentenceTaskModel } from './../../models/tasks/sentences/assign-sentence-task.model'
import { AnsweredSentenceModel } from './../../models/tasks/sentences/answered-sentence.model'
import { TaskAnswerModel } from './../models/task-answer.model';

import { UserModel } from './../../models/users/user.model';

import { Router, ActivatedRoute } from "@angular/router";

import { Enums } from './../../app-enums';
import { Constants } from './../../app-constants';

@Component(
  {
    selector: 'sentence-task-wizard',
    templateUrl: './sentence-task-wizard.component.html',
  })
export class SentenceTaskWizardComponent implements OnInit {
  public assignedSentenceTask: SentenceTaskModel;
  public answeredSentenceTask: AssignSentenceTaskModel;
  public wizardForm: FormGroup;
  public sentenceIndex: number;
  public submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    private assignService: AssignSentenceTaskService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.sentenceIndex = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.assignService.getPupilTask(this.authService.currentUserValue.id, e["id"]).subscribe(task => {
        var taskInstance = (<AssignSentenceTaskModel>task);
        this.assignedSentenceTask = taskInstance.sentenceTask;
        this.answeredSentenceTask = task;
        this.answeredSentenceTask.user = new UserModel(null, null, Enums.EUserType.Pupil, this.authService.currentUserValue.id, null);
        this.assignedSentenceTask.sentences.sort((f, s) => f.order - s.order);
      });
    });

    this.wizardForm = this.formBuilder.group({
      answer: ['', Validators.required],
    });
  }

  onBack() {
    if (this.sentenceIndex !== 0) {
      this.sentenceIndex--;
      this.handleWordSwap();
    }
  }

  onNext() {
    this.submitted = true;
    if (this.sentenceIndex !== this.assignedSentenceTask.sentences.length - 1 && !this.wizardForm.invalid) {
      this.handleAnswer();
      this.sentenceIndex++;
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
    this.answeredSentenceTask.taskStatus = Enums.ETaskStatus.Done;
    this.assignService.completeSentenceTask(this.answeredSentenceTask).subscribe(e => {
      this.router.navigate(['/pupil-sentence-tasks']);
    });
  }


  private handleWordSwap() {

    var existingAnswerIndex =
      this.answeredSentenceTask.answeredSentences.findIndex(
        aw => aw.sentence.id === this.assignedSentenceTask.sentences[this.sentenceIndex].id && aw.answer !== null);
    if (existingAnswerIndex === -1) {
      this.wizardForm.reset();
    } else {
      this.wizardForm.controls.answer.setValue(this.answeredSentenceTask.answeredSentences[existingAnswerIndex].answer.answer);
    }
  }

  private handleAnswer() {
    var answeredSentence = new AnsweredSentenceModel(this.assignedSentenceTask.sentences[this.sentenceIndex].sentence,
      new TaskAnswerModel(this.wizardForm.controls.answer.value, Constants.guidEmpty, null));
    var existingAnswerIndex = this.answeredSentenceTask.answeredSentences.findIndex(e => e.sentence.id === answeredSentence.sentence.id);
    if (existingAnswerIndex !== -1) {
      this.answeredSentenceTask.answeredSentences.splice(existingAnswerIndex, 1, answeredSentence);
    } else {
      this.answeredSentenceTask.answeredSentences.push(answeredSentence);
    }
  }
}

