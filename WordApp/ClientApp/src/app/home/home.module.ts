import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [FormsModule, BrowserModule],
  exports: [HomeComponent]
})

export class HomeModule {

}
