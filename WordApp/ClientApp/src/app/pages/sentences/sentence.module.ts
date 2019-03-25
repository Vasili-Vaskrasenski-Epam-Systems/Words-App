import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SentenceService } from "./../../services/sentence.service";

import { CommonComponentsModule } from './../../common/common-components.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { SentenceListComponent } from './sentence-list.component';
import { SentenceEditorFormComponent } from './sentence-editor-form.component';

@NgModule({
  declarations: [
    SentenceListComponent, SentenceEditorFormComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, CommonComponentsModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  providers: [SentenceService],
  exports: [],
  entryComponents: [SentenceEditorFormComponent]
})

export class SentenceModule {

}

