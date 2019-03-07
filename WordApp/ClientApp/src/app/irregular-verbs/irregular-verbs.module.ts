import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IrregularVerbsService } from "./irregular-verbs.service"

import { IrregularVerbsComponent } from './irregular-verbs.component';
import { IrregularVerbEditorComponent } from './irregular-verb-editor/irregular-verb-editor.component';
import { IrregularVerbEditorFormComponent } from "./irregular-verb-editor/irregular-verb-editor-form.component";

@NgModule({
  declarations: [
    IrregularVerbsComponent,
    IrregularVerbEditorComponent,
    IrregularVerbEditorFormComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule],
  providers: [IrregularVerbsService],
  exports: [IrregularVerbsComponent],
  entryComponents: [IrregularVerbEditorFormComponent]
})

export class IrregularVerbsModule {

}
