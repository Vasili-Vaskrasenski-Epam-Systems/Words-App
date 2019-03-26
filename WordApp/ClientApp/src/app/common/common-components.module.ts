import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SelectComponent } from './select.component';
import { CommonDatepickerComponent } from './common-datepicker.component';
import { CommonDraggableListComponent } from './common-draggable-list.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material';

@NgModule({
  declarations: [
    SelectComponent,
    CommonDatepickerComponent,
    CommonDraggableListComponent,
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, NgbModule, DragDropModule, MatProgressSpinnerModule],
  exports: [
    SelectComponent,
    CommonDatepickerComponent,
    CommonDraggableListComponent,
    MatSpinner
  ],
  providers: [],
  entryComponents: []
})

export class CommonComponentsModule {
  
}

