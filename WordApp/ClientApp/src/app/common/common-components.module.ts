import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonEditButtonsComponent } from './edit-buttons.component';


@NgModule({
  declarations: [
    CommonEditButtonsComponent
    
  ],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule],
  exports: [
    CommonEditButtonsComponent
  ],
  providers: [],
  entryComponents: []
})

export class CommonComponentsModule {

}

