import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonEditButtonsComponent } from './edit-buttons.component';
import { SelectComponent } from './select.component';
import { CommonDatepickerComponent } from './common-datepicker.component';

@NgModule({
  declarations: [
    CommonEditButtonsComponent,
    SelectComponent,
    CommonDatepickerComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, NgbModule],
  exports: [
    CommonEditButtonsComponent,
    SelectComponent,
    CommonDatepickerComponent
  ],
  providers: [],
  entryComponents: []
})

export class CommonComponentsModule {

}

