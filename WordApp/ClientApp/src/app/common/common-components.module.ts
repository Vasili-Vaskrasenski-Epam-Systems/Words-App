import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonEditButtonsComponent } from './edit-buttons.component';
import { SelectComponent } from './select.component';
import { CommonDatepickerComponent } from './common-datepicker.component';
import { CommonDraggableListComponent } from './common-draggable-list.component';
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    CommonEditButtonsComponent,
    SelectComponent,
    CommonDatepickerComponent,
    CommonDraggableListComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, NgbModule, DragDropModule],
  exports: [
    CommonEditButtonsComponent,
    SelectComponent,
    CommonDatepickerComponent,
    CommonDraggableListComponent
  ],
  providers: [],
  entryComponents: []
})

export class CommonComponentsModule {

}

