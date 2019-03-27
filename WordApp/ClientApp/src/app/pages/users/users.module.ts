import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonComponentsModule } from './../../common/common-components.module';

import { UserService } from './../../services/user.service';
import { UserTokenService } from './../../services/users/user-token.service';

import { UserListComponent } from './user-list.component';
import { UserEditorFormComponent } from './user-editor-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';



@NgModule({
  declarations: [
    UserListComponent,
    UserEditorFormComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, CommonComponentsModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  exports: [],
  providers: [UserService, UserTokenService],
  entryComponents: [UserEditorFormComponent]
})

export class UsersModule {

}

