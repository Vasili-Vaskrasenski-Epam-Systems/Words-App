import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth-guard';

import { HomeComponent } from './home/home.component';
import { WordsComponent } from "./words/words.component";
import { IrregularVerbsComponent } from './irregular-verbs/irregular-verbs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { UserListComponent } from './users/user-list.component';
import { WordTaskListComponent } from './tasks/word-task/word-task-list.component';
import { WordTaskDetailsComponent } from './tasks/word-task/word-task-details.component';
import { PupilTaskListComponent } from './tasks/pupil-tasks-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'words', component: WordsComponent, canActivate: [AuthGuard] },
  { path: 'irregular-verbs', component: IrregularVerbsComponent, canActivate: [AuthGuard] },
  { path: 'user-management', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'task-management', component: WordTaskListComponent, canActivate: [AuthGuard] },
  { path: 'word-task-details/:id', component: WordTaskDetailsComponent, canActivate: [AuthGuard] },
  { path: 'my-tasks', component: PupilTaskListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [PageNotFoundComponent]
})

export class AppRoutingModule { }

