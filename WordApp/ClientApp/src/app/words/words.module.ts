import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WordsComponent } from './words.component';
import { WordEditorComponent } from './word-editor/word-editor.component';
import { WordEditorFormComponent } from './word-editor/word-editor-form.component';
import { WordsService } from './words.service';


@NgModule({
  declarations: [
    WordsComponent,
    WordEditorComponent,
    WordEditorFormComponent
    ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule ],
  exports: [
    WordsComponent
  ],
  providers:[WordsService],
  entryComponents: [WordEditorFormComponent]
})

export class WordsModule {

}
