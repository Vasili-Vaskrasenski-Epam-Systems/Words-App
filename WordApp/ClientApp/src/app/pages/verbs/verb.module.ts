import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { VerbService } from "./../../services/verb.service"

import { VerbListComponent } from './verb-list.component';
import { VerbEditorFormComponent } from "./verb-editor-form.component";
import { CommonComponentsModule } from './../../common/common-components.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';


@NgModule({
  declarations: [
    VerbListComponent,
    VerbEditorFormComponent,
  ],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, CommonComponentsModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  providers: [VerbService],
  exports: [VerbListComponent],
  entryComponents: [VerbEditorFormComponent]
})

export class VerbModule {

}
