import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WordListComponent } from './word-list.component';
import { WordEditorFormComponent } from './word-editor-form.component';
import { WordsService } from './../../services/words.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatInputModule } from '@angular/material';
import { CommonComponentsModule } from './../../common/common-components.module';

@NgModule({
  declarations: [
    WordListComponent,
    WordEditorFormComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatInputModule, CommonComponentsModule],
  exports: [
    WordListComponent
  ],
  providers: [WordsService],
  entryComponents: [WordEditorFormComponent]
})

export class WordsModule {

}
