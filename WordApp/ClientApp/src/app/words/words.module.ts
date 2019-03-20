import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WordListComponent } from './word-list.component';
import { WordEditorFormComponent } from './word-editor-form.component';
import { WordsService } from './words.service';
import { CommonComponentsModule } from './../common/common-components.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    WordListComponent,
    WordEditorFormComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, CommonComponentsModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  exports: [
    WordListComponent
  ],
  providers: [WordsService],
  entryComponents: [WordEditorFormComponent]
})

export class WordsModule {

}
