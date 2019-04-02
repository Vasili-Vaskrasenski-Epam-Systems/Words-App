import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DatePipe } from "@angular/common";
import { MatMenuModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angular-6-social-login';

import { WordsModule } from './pages/words/words.module';
import { VerbModule } from './pages/verbs/verb.module';
import { UsersModule } from './pages/users/users.module';
import { TaskModule } from './pages/tasks/task.module';
import { SentenceModule } from './pages/sentences/sentence.module';

import { EnumToArrayPipe } from './infrastructure/pipes/enum-to-array.pipe';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { HomeComponent} from './pages/home/home.component'
import { AlertComponent } from './alert/alert.component';
import { ErrorInterceptor } from './app-error-interceptor';

import { Randomizer } from './infrastructure/helpers/randomizer';

import {ExternalAuthService} from './auth/external-auth.service';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('595140502300-0dfj8j89epsbojgt0s9eo7de3u64ctjg.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatMenuModule,
    SocialLoginModule,
    
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, DatePipe, EnumToArrayPipe, Randomizer, {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }, ExternalAuthService]
})
export class AppModule { }
