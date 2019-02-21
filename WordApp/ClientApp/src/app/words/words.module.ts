import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WordsComponent } from './words.component';

@NgModule({
  declarations: [WordsComponent],
  imports: [FormsModule, BrowserModule],
  exports: [WordsComponent]
})

export class WordsModule {

}
