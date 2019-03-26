import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';
import { WordsModule } from './pages/words/words.module';
import { VerbModule } from './pages/verbs/verb.module';
import { UsersModule } from './pages/users/users.module';
import { TaskModule } from './tasks/task.module';
import { SentenceModule } from './pages/sentences/sentence.module';

import { DatePipe } from "@angular/common";

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

    MatMenuModule,

    AppRoutingModule,
    
    WordsModule,
    HomeModule,
    VerbModule,
    UsersModule,
    TaskModule,
    SentenceModule
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, DatePipe]
})
export class AppModule { }
