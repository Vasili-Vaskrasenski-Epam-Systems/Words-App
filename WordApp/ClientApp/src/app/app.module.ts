import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { WordsModule } from './words/words.module';
import { IrregularVerbsModule } from './irregular-verbs/irregular-verbs.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './auth/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    WordsModule,
    HomeModule,
    IrregularVerbsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
