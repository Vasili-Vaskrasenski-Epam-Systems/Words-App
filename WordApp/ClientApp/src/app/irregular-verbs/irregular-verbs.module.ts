import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IrregularVerbsService } from "./irregular-verbs.service"

import { IrregularVerbsComponent } from './irregular-verbs.component';
import { IrregularVerbEditorFormComponent } from "./irregular-verb-editor/irregular-verb-editor-form.component";

@NgModule({
  declarations: [IrregularVerbsComponent, IrregularVerbEditorFormComponent],
  imports: [FormsModule, BrowserModule],
  providers: [IrregularVerbsService],
  exports: [IrregularVerbsComponent],
  entryComponents: [IrregularVerbEditorFormComponent]
})

export class IrregularVerbsModule {

}
