import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonComponentsModule } from './../common/common-components.module';

import { TaskService } from './task.service';

import { HelpersModule } from './../helpers/helpers.module';

import { TaskEditorFormComponent } from './task-editor-form.component';
import { TaskListComponent } from './task-list.component';


@NgModule({
  declarations: [
    TaskEditorFormComponent, TaskListComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, CommonComponentsModule, HelpersModule],
  exports: [],
  providers: [TaskService],
  entryComponents: [TaskEditorFormComponent]
})

export class TaskModule {

}


