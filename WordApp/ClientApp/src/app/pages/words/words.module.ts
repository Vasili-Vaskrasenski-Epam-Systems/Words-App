import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatInputModule } from '@angular/material';
import { CommonComponentsModule } from './../../common/common-components.module';
import { MatCheckboxModule } from '@angular/material/checkbox'

import { WordListComponent } from './word-list.component';
import { WordEditorFormComponent } from './word-editor-form.component';
import {WordCheckerComponent} from './word-checker.component';

import { WordsService } from './../../services/words.service';

@NgModule({
  declarations: [
    WordListComponent,
    WordEditorFormComponent,
    WordCheckerComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatInputModule, MatCheckboxModule, CommonComponentsModule],
  exports: [
    WordListComponent
  ],
  providers: [WordsService],
  entryComponents: [WordEditorFormComponent, WordCheckerComponent]
})

export class WordsModule {

}
