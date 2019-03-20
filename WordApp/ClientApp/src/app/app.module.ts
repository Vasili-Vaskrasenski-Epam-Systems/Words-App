import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { HelpersModule } from './helpers/helpers.module';

import { HomeModule } from './home/home.module';
import { WordsModule } from './words/words.module';
import { VerbModule } from './verbs/verb.module';
import { UsersModule } from './users/users.module';
import { TaskModule } from './tasks/task.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { AlertComponent } from './alert/alert.component';
import { ErrorInterceptor } from './app-error-interceptor';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,
    HelpersModule,

    WordsModule,
    HomeModule,
    VerbModule,
    UsersModule,
    TaskModule,
    MatTableModule,
    MatPaginatorModule
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }]
})
export class AppModule { }
