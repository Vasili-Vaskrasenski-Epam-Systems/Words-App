import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth-guard';

import { HomeComponent } from './home/home.component';
import { WordListComponent } from "./words/word-list.component";
import { VerbListComponent } from './verbs/verb-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { UserListComponent } from './users/user-list.component';
import { WordTaskListComponent } from './tasks/word-task/word-task-list.component';
import { WordTaskDetailsComponent } from './tasks/word-task/word-task-details.component';
import { PupilWordTaskListComponent  } from './tasks/word-task/pupil-word-task-list.component';
import { WordTaskWizardComponent } from './tasks/word-task/word-task-wizard.component';
import { WordTaskResultsComponent } from './tasks/word-task/word-task-results.component';
import { VerbTaskListComponent } from './tasks/verb-task/verb-task-list.component';
import { VerbTaskDetailsComponent } from './tasks/verb-task/verb-task-details.component';
import { VerbTaskWizardComponent } from './tasks/verb-task/verb-task-wizard.component';
import { VerbTaskResultsComponent } from './tasks/verb-task/verb-task-results.component';
import { PupilVerbTaskListComponent } from './tasks/verb-task/pupil-verb-task-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'words', component: WordListComponent, canActivate: [AuthGuard] },
  { path: 'irregular-verbs', component: VerbListComponent, canActivate: [AuthGuard] },
  { path: 'user-management', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'word-task-management', component: WordTaskListComponent, canActivate: [AuthGuard] },
  { path: 'verb-task-management', component: VerbTaskListComponent, canActivate: [AuthGuard] },
  { path: 'word-task-details/:id', component: WordTaskDetailsComponent, canActivate: [AuthGuard] },
  { path: 'verb-task-details/:id', component: VerbTaskDetailsComponent, canActivate: [AuthGuard] },
  { path: 'pupil-word-tasks', component: PupilWordTaskListComponent, canActivate: [AuthGuard] },
  { path: 'pupil-verb-tasks', component: PupilVerbTaskListComponent, canActivate: [AuthGuard] },
  { path: 'word-task-wizard/:id', component: WordTaskWizardComponent, canActivate: [AuthGuard] },
  { path: 'word-task-results/:id', component: WordTaskResultsComponent, canActivate: [AuthGuard] },
  { path: 'verb-task-wizard/:id', component: VerbTaskWizardComponent, canActivate: [AuthGuard] },
  { path: 'verb-task-results/:id', component: VerbTaskResultsComponent, canActivate: [AuthGuard] },
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

