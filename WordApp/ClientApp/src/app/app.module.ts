import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HelpersModule } from './helpers/helpers.module';

import { HomeModule } from './home/home.module';
import { WordsModule } from './words/words.module';
import { IrregularVerbsModule } from './irregular-verbs/irregular-verbs.module';
import { UsersModule } from './users/users.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { AlertComponent } from './alert/alert.component';

import { ErrorInterceptor } from './app-error-interceptor';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,
    HelpersModule,

    WordsModule,
    HomeModule,
    IrregularVerbsModule,
    UsersModule
  ],
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    RegistrationComponent,
    AlertComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ]
})
export class AppModule { }
