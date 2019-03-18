import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonComponentsModule } from './../common/common-components.module';

import { WordTaskService } from './services/word-task.service';
import { AssignWordTaskService } from './services/assign-word-task.service';
import { VerbTaskService } from './services/verb-task.service';
import { AssignVerbTaskService } from './services/assign-verb-task.service';

import { HelpersModule } from './../helpers/helpers.module';

import { AssignTaskComponent } from './common/assign-task.component';

import { WordTaskEditorFormComponent } from './word-task/word-task-editor-form.component';
import { WordTaskListComponent } from './word-task/word-task-list.component';
import { WordTaskDetailsComponent } from './word-task/word-task-details.component';
import { PupilTaskListComponent } from './pupil-tasks-list.component';
import { WordTaskWizardComponent } from './word-task/word-task-wizard.component';
import { WordTaskResultsComponent } from './word-task/word-task-results.component';

import { VerbTaskEditorFormComponent } from './verb-task/verb-task-editor-form.component';
import { VerbTaskListComponent } from './verb-task/verb-task-list.component';
import { VerbTaskDetailsComponent } from './verb-task/verb-task-details.component';
import { VerbTaskWizardComponent } from './verb-task/verb-task-wizard.component';
import { VerbTaskResultsComponent } from './verb-task/verb-task-results.component';

import { CustomWordTaskDetailsProvider } from './../custom-providers/custom-word-task-details.provider';

@NgModule({
  declarations: [
    WordTaskEditorFormComponent, WordTaskListComponent, AssignTaskComponent, WordTaskDetailsComponent, PupilTaskListComponent, WordTaskWizardComponent,
    WordTaskResultsComponent, VerbTaskEditorFormComponent, VerbTaskListComponent, VerbTaskDetailsComponent, VerbTaskWizardComponent, VerbTaskResultsComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, CommonComponentsModule, HelpersModule, RouterModule],
  exports: [],
  providers: [WordTaskService, AssignWordTaskService, CustomWordTaskDetailsProvider, VerbTaskService, AssignVerbTaskService],
  entryComponents: [WordTaskEditorFormComponent, AssignTaskComponent, VerbTaskEditorFormComponent]
})

export class TaskModule {

}


