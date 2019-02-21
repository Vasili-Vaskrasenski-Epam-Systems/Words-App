import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WordsComponent } from './words.component';
import {WordEditorComponent} from './word-editor/word-editor.component'

@NgModule({
  declarations: [WordsComponent, WordEditorComponent],
  imports: [FormsModule, BrowserModule],
  exports: [WordsComponent]
})

export class WordsModule {

}
