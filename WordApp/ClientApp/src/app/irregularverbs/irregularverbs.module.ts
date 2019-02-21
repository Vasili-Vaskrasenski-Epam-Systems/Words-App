import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IrregularVerbsComponent } from './irregularverbs.component';

@NgModule({
  declarations: [IrregularVerbsComponent],
  imports: [FormsModule, BrowserModule],
  exports: [IrregularVerbsComponent]
})

export class IrregularVerbsModule {

}
