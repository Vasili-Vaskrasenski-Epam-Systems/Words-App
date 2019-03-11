import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IrregularVerbsService } from "./irregular-verbs.service"

import { IrregularVerbsComponent } from './irregular-verbs.component';
import { IrregularVerbEditorFormComponent } from "./irregular-verb-editor/irregular-verb-editor-form.component";
import { CommonComponentsModule } from './../common/common-components.module';

@NgModule({
  declarations: [
    IrregularVerbsComponent,
    IrregularVerbEditorFormComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, CommonComponentsModule],
  providers: [IrregularVerbsService],
  exports: [IrregularVerbsComponent],
  entryComponents: [IrregularVerbEditorFormComponent]
})

export class IrregularVerbsModule {

}
