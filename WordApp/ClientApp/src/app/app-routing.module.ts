import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth-guard';

import { HomeComponent } from './home/home.component';
import { WordsComponent } from "./words/words.component";
import { IrregularVerbsComponent } from './irregular-verbs/irregular-verbs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'words', component: WordsComponent, canActivate: [AuthGuard] },
  { path: 'irregular-verbs', component: IrregularVerbsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [PageNotFoundComponent]
})

export class AppRoutingModule {}

