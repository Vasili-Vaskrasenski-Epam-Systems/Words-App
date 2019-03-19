import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { VerbService } from "./verb.service"

import { VerbListComponent } from './verb-list.component';
import { VerbEditorFormComponent } from "./verb-editor-form.component";
import { CommonComponentsModule } from './../common/common-components.module';

@NgModule({
  declarations: [
    VerbListComponent,
    VerbEditorFormComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, CommonComponentsModule],
  providers: [VerbService],
  exports: [VerbListComponent],
  entryComponents: [VerbEditorFormComponent]
})

export class VerbModule {

}
