import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { UserProfileModel } from './../../models/users/user-profile.model';

import { UserProfileService } from "./../../services/users/user-profile.service";
@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  submitted = false;
  private profileObject: UserProfileModel;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userProfileService: UserProfileService, private datePipe: DatePipe) { }

  ngOnInit() {
        this.route.params.subscribe(e => {
      this.userProfileService.getUserProfile(e['id']).subscribe(data => {
        this.profileObject = data;
        this.userProfileForm.controls.email.setValue(this.profileObject.email);
        this.userProfileForm.controls.name.setValue(this.profileObject.name);
        this.userProfileForm.controls.firstName.setValue(this.profileObject.firstName);
        this.userProfileForm.controls.lastName.setValue(this.profileObject.lastName);
        this.userProfileForm.controls.birthDate.setValue(this.profileObject.birthDate);
      });
    });

    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      datepicker: ['', Validators.required],
      birthDate: [''],
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.userProfileForm)

    if (this.userProfileForm.invalid) {
      return;
    }
  }

  public onDateChanged(obj: NgbDateStruct) {
    this.userProfileForm.controls.birthDate.setValue(this.datePipe.transform(new Date(obj.year, obj.month - 1, obj.day)));
  }
}

