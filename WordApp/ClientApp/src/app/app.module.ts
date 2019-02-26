import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './home/home.module';
import { WordsModule } from './words/words.module';
import { IrregularVerbsModule } from './irregular-verbs/irregular-verbs.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { WordsComponent } from "./words/words.component";
import { IrregularVerbsComponent } from './irregular-verbs/irregular-verbs.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'words', component: WordsComponent },
  { path: 'irregular-verbs', component: IrregularVerbsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    WordsModule,
    HomeModule,
    IrregularVerbsModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
