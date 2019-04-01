import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AssignVerbTaskService } from './../../../services/tasks/assign-verb-task.service';
import { AuthService } from './../../../auth/auth.service';

import { VerbTaskModel } from './../../../models/tasks/verbs/verb-task.model';
import { AnsweredVerbModel } from './../../../models/tasks/verbs/answered-verb.model';
import { VerbTaskAnswerModel } from './../../../models/tasks/verbs/verb-task-answer.model';
import { AssignVerbTaskModel } from './../../../models/tasks/verbs/assign-verb-task.model';
import { UserModel } from './../../../models/users/user.model';

import { Constants } from './../../../app-constants';
import { EUserType, ETaskStatus } from './../../../app-enums';
import { CommonLoadingComponent } from './../../../common/common-loading.component';
@Component(
  {
    selector: 'verb-task-wizard',
    templateUrl: './verb-task-wizard.component.html',
  })
export class VerbTaskWizardComponent implements OnInit {
  public assignedVerbTask: VerbTaskModel;
  public answeredVerbTask: AssignVerbTaskModel;
  public wizardForm: FormGroup;
  public verbIndex: number;
  public submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    private assignService: AssignVerbTaskService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
    this.verbIndex = 0;
    this.dialog.open(CommonLoadingComponent, { disableClose: true });
  }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.assignService.getPupilTask(this.authService.currentUserValue.id, e["id"]).subscribe(task => {
        var taskInstance = (<AssignVerbTaskModel>task);
        this.assignedVerbTask = taskInstance.verbTask;
        this.answeredVerbTask = task;
        this.answeredVerbTask.user = new UserModel(null, null, EUserType.Pupil, this.authService.currentUserValue.id, null);
        this.assignedVerbTask.verbs.sort((f, s) => f.order - s.order);
        this.dialog.closeAll();
      }, error => { this.dialog.closeAll(); console.log(error); });
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
    this.answeredVerbTask.taskStatus = ETaskStatus.Done;
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


