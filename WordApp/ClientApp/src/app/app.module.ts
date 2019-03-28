import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { WordsModule } from './pages/words/words.module';
import { VerbModule } from './pages/verbs/verb.module';
import { UsersModule } from './pages/users/users.module';
import { TaskModule } from './pages/tasks/task.module';
import { SentenceModule } from './pages/sentences/sentence.module';

import { DatePipe } from "@angular/common";
import { EnumToArrayPipe } from './infrastructure/pipes/enum-to-array.pipe';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { HomeComponent} from './pages/home/home.component'
import { AlertComponent } from './alert/alert.component';
import { ErrorInterceptor } from './app-error-interceptor';

import { Randomizer } from './infrastructure/helpers/randomizer';

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
    HomeComponent,
    AlertComponent,
    EnumToArrayPipe,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, DatePipe, EnumToArrayPipe, Randomizer]
})
export class AppModule { }
