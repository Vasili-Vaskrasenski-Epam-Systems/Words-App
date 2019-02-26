import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WordsComponent } from './words.component';
import { WordEditorComponent } from './word-editor/word-editor.component';
import { WordEditorFormComponent } from './word-editor/word-editor-form.component';


@NgModule({
  declarations: [
    WordsComponent,
    WordEditorComponent,
    WordEditorFormComponent
    ],
  imports: [FormsModule, BrowserModule],
  exports: [
    WordsComponent,
    WordEditorComponent
  ],
  entryComponents: [WordEditorFormComponent]
})

export class WordsModule {

}
