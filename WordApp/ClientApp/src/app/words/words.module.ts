import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WordsComponent } from './words.component';
import { WordEditorFormComponent } from './word-editor-form.component';
import { WordsService } from './words.service';
import { CommonComponentsModule } from './../common/common-components.module';


@NgModule({
  declarations: [
    WordsComponent,
    WordEditorFormComponent
    ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, CommonComponentsModule ],
  exports: [
    WordsComponent
  ],
  providers:[WordsService],
  entryComponents: [WordEditorFormComponent]
})

export class WordsModule {

}
