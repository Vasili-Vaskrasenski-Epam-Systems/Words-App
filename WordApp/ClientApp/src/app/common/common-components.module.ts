import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SelectComponent } from './select.component';
import { CommonDatepickerComponent } from './common-datepicker.component';
import { CommonDraggableListComponent } from './common-draggable-list.component';
import { CommonCountSetterDialogComponent } from './common-count-setter-dialog.component';

import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatProgressSpinnerModule, MatSpinner, MatDialogModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [
    SelectComponent,
    CommonDatepickerComponent,
    CommonDraggableListComponent,
    CommonCountSetterDialogComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, NgbModule, DragDropModule, MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule],
  exports: [
    SelectComponent,
    CommonDatepickerComponent,
    CommonDraggableListComponent,
    CommonCountSetterDialogComponent,
    MatSpinner
  ],
  providers: [],
  entryComponents: [CommonCountSetterDialogComponent]
})

export class CommonComponentsModule {
  
}

