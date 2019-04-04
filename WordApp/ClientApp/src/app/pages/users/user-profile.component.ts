import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
    });

    this.route.params.subscribe(e => {
      this.userProfileService.getUserProfile(e['id']).subscribe(data => {
        this.profileObject = data;
        console.log(this.profileObject);
      });
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.userProfileForm.invalid) {
      return;
    }
  }
}

