import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonComponentsModule } from './../common/common-components.module';

import { WordTaskService } from './services/word-task.service';
import { AssignWordTaskService } from './services/assign-word-task.service';

import { HelpersModule } from './../helpers/helpers.module';

import { WordTaskEditorFormComponent } from './word-task/word-task-editor-form.component';
import { WordTaskListComponent } from './word-task/word-task-list.component';
import { AssignTaskComponent } from './common/assign-task.component';
import { WordTaskDetailsComponent } from './word-task/word-task-details.component';
import { PupilTaskListComponent } from './pupil-tasks-list.component';
import { WordTaskWizardComponent } from './word-task/word-task-wizard.component';

import { CustomWordTaskDetailsProvider } from './../custom-providers/custom-word-task-details.provider';

@NgModule({
  declarations: [
    WordTaskEditorFormComponent, WordTaskListComponent, AssignTaskComponent, WordTaskDetailsComponent, PupilTaskListComponent, WordTaskWizardComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, CommonComponentsModule, HelpersModule, RouterModule],
  exports: [],
  providers: [WordTaskService, AssignWordTaskService, CustomWordTaskDetailsProvider],
  entryComponents: [WordTaskEditorFormComponent, AssignTaskComponent]
})

export class TaskModule {

}


