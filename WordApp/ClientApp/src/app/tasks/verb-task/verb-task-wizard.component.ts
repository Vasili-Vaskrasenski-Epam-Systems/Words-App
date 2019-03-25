import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AssignVerbTaskService } from './../services/assign-verb-task.service';
import { AuthService } from './../../auth/auth.service';

import { VerbTaskModel } from './../models/verb-task.model';
import { AnsweredVerbModel } from './../models/answered-verb.model';
import { VerbTaskAnswerModel } from './../models/verb-task-answer.model';
import { AssignableVerbTaskModel } from './../models/assignable-verb-task.model';
import { UserModel } from './../../users/user.model';

import { Router,ActivatedRoute } from "@angular/router";

import { Constants } from './../../app-constants';
import { Enums } from './../../app-enums';

@Component(
  {
    selector: 'verb-task-wizard',
    templateUrl: './verb-task-wizard.component.html',
  })
export class VerbTaskWizardComponent implements OnInit {
  public assignedVerbTask: VerbTaskModel;
  public answeredVerbTask: AssignableVerbTaskModel;
  public wizardForm: FormGroup;
  public verbIndex: number;
  public submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    private assignService: AssignVerbTaskService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.verbIndex = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.assignService.getPupilTask(this.authService.currentUserValue.id, e["id"]).subscribe(task => {
        var taskInstance = (<AssignableVerbTaskModel>task);
        this.assignedVerbTask = taskInstance.verbTask;
        this.answeredVerbTask = task;
        this.answeredVerbTask.user = new UserModel(null, null, Enums.EUserType.Pupil, this.authService.currentUserValue.id, null);
        this.assignedVerbTask.verbs.sort((f, s) => f.order - s.order);
      });
    });
   

    this.wizardForm = this.formBuilder.group({
      firstForm: ['', Validators.required],
      secondForm: ['', Validators.required],
      thirdForm: ['', Validators.required],
    });
  }

  onBack() {
    if (this.verbIndex !== 0) {
      this.verbIndex--;
      this.handleWordSwap();
    }
  }

  onNext() {
    this.submitted = true;
    if (this.verbIndex !== this.assignedVerbTask.verbs.length - 1 && !this.wizardForm.invalid) {
      this.handleAnswer();
      this.verbIndex++;
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
    this.answeredVerbTask.taskStatus = Enums.ETaskStatus.Done;
    this.assignService.completeWordTask(this.answeredVerbTask).subscribe(e => {
      this.router.navigate(['/pupil-verb-tasks']);
    });
  }


  private handleWordSwap() {

    var existingAnswerIndex =
      this.answeredVerbTask.answeredVerbs.findIndex(
        aw => aw.verb.id === this.assignedVerbTask.verbs[this.verbIndex].id && aw.answer !== null);
    if (existingAnswerIndex === -1) {
      this.wizardForm.reset();
    } else {
      this.wizardForm.controls.firstForm.setValue(this.answeredVerbTask.answeredVerbs[existingAnswerIndex].answer.firstForm);
      this.wizardForm.controls.secondForm.setValue(this.answeredVerbTask.answeredVerbs[existingAnswerIndex].answer.secondForm);
      this.wizardForm.controls.thirdForm.setValue(this.answeredVerbTask.answeredVerbs[existingAnswerIndex].answer.thirdForm);
    }
  }

  private handleAnswer() {
    var answeredVerb = new AnsweredVerbModel(this.assignedVerbTask.verbs[this.verbIndex].verb,
      new VerbTaskAnswerModel(this.wizardForm.controls.firstForm.value, this.wizardForm.controls.secondForm.value, this.wizardForm.controls.thirdForm.value, Constants.guidEmpty, null));
    var existingAnswerIndex = this.answeredVerbTask.answeredVerbs.findIndex(e => e.verb.id === answeredVerb.verb.id);
    if (existingAnswerIndex !== -1) {
      this.answeredVerbTask.answeredVerbs.splice(existingAnswerIndex, 1, answeredVerb);
    } else {
      this.answeredVerbTask.answeredVerbs.push(answeredVerb);
    }
  }
}


