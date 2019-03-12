import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonEditButtonsComponent } from './edit-buttons.component';
import { SelectComponent } from './select.component';


@NgModule({
  declarations: [
    CommonEditButtonsComponent,
    SelectComponent
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule],
  exports: [
    CommonEditButtonsComponent,
    SelectComponent
  ],
  providers: [],
  entryComponents: []
})

export class CommonComponentsModule {

}

