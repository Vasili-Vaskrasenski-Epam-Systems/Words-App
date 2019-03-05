import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { WordsComponent } from "./words/words.component";
import { IrregularVerbsComponent } from './irregular-verbs/irregular-verbs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'words', component: WordsComponent },
  { path: 'irregular-verbs', component: IrregularVerbsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [PageNotFoundComponent]
})

export class AppRoutingModule {}
