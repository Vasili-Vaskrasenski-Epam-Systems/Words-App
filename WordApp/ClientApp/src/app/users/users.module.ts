import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonComponentsModule } from './../common/common-components.module';

import { UserService } from './user.service';

import { UserListComponent } from './user-list.component';
import { UserEditorFormComponent } from './user-editor-form.component';
import { HelpersModule } from './../helpers/helpers.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';



@NgModule({
  declarations: [
    UserListComponent,
    UserEditorFormComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, CommonComponentsModule, HelpersModule, MatTableModule, MatPaginatorModule ],
  exports: [],
  providers:[UserService],
  entryComponents: [UserEditorFormComponent]
})

export class UsersModule {

}

