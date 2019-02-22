import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WordsComponent } from './words.component';
import { WordEditorBtnBarComponent } from './word-editor/word-editor-btn-bar.component';
import { WordEditorFormComponent } from './word-editor/word-editor-form.component';

@NgModule({
  declarations: [
    WordsComponent,
    WordEditorBtnBarComponent,
    WordEditorFormComponent
  ],
  imports: [FormsModule, BrowserModule],
  exports: [WordsComponent]
})

export class WordsModule {

}
