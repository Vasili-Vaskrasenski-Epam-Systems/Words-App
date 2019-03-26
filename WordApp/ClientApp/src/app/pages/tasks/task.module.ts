import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonComponentsModule } from './../../common/common-components.module';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { WordTaskService } from './../../services/tasks/word-task.service';
import { AssignWordTaskService } from './../../services/tasks/assign-word-task.service';

import { VerbTaskService } from './../../services/tasks/verb-task.service';
import { AssignVerbTaskService } from './../../services/tasks/assign-verb-task.service';

import { SentenceTaskService } from './../../services/tasks/sentence-task.service';
import { AssignSentenceTaskService } from './../../services/tasks/assign-sentence-task.service';

import { AssignTaskComponent } from './common/assign-task.component';

import { WordTaskEditorFormComponent } from './word-task/word-task-editor-form.component';
import { WordTaskListComponent } from './word-task/word-task-list.component';
import { WordTaskDetailsComponent } from './word-task/word-task-details.component';
import { PupilWordTaskListComponent } from './word-task/pupil-word-task-list.component';
import { WordTaskWizardComponent } from './word-task/word-task-wizard.component';
import { WordTaskResultsComponent } from './word-task/word-task-results.component';

import { VerbTaskEditorFormComponent } from './verb-task/verb-task-editor-form.component';
import { VerbTaskListComponent } from './verb-task/verb-task-list.component';
import { VerbTaskDetailsComponent } from './verb-task/verb-task-details.component';
import { VerbTaskWizardComponent } from './verb-task/verb-task-wizard.component';
import { VerbTaskResultsComponent } from './verb-task/verb-task-results.component';
import { PupilVerbTaskListComponent } from './verb-task/pupil-verb-task-list.component';

import { SentenceTaskEditorFormComponent } from './sentence-task/sentence-task-editor-form.component';
import { SentenceTaskListComponent } from './sentence-task/sentence-task-list.component';
import { SentenceTaskDetailsComponent } from './sentence-task/sentence-task-details.component';
import { SentenceTaskWizardComponent } from './sentence-task/sentence-task-wizard.component';
import { PupilSentenceTaskListComponent } from './sentence-task/pupil-sentence-task-list.component';
import { SentenceTaskResultsComponent } from './sentence-task/sentence-task-results.component';

@NgModule({
  declarations: [
    WordTaskEditorFormComponent, WordTaskListComponent, AssignTaskComponent, WordTaskDetailsComponent, PupilWordTaskListComponent, WordTaskWizardComponent,
    WordTaskResultsComponent, VerbTaskEditorFormComponent, VerbTaskListComponent, VerbTaskDetailsComponent, VerbTaskWizardComponent, VerbTaskResultsComponent,
    PupilVerbTaskListComponent, SentenceTaskEditorFormComponent, SentenceTaskListComponent, SentenceTaskDetailsComponent, SentenceTaskWizardComponent, PupilSentenceTaskListComponent,
    SentenceTaskResultsComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, CommonComponentsModule, RouterModule, MatCheckboxModule,
    MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule],
  exports: [],
  providers: [WordTaskService, AssignWordTaskService, VerbTaskService, AssignVerbTaskService, SentenceTaskService, AssignSentenceTaskService],
  entryComponents: [WordTaskEditorFormComponent, AssignTaskComponent, VerbTaskEditorFormComponent, SentenceTaskEditorFormComponent]
})

export class TaskModule {

}


