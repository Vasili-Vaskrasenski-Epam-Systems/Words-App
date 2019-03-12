import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonComponentsModule } from './../common/common-components.module';

import { WordTaskService } from './services/word-task.service';

import { HelpersModule } from './../helpers/helpers.module';

import { WordTaskEditorFormComponent } from './word-task/word-task-editor-form.component';
import { WordTaskListComponent } from './word-task/word-task-list.component';


@NgModule({
  declarations: [
    WordTaskEditorFormComponent, WordTaskListComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, CommonComponentsModule, HelpersModule],
  exports: [],
  providers: [WordTaskService],
  entryComponents: [WordTaskEditorFormComponent]
})

export class TaskModule {

}


