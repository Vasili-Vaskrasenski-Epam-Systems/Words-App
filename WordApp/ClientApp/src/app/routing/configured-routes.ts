import { RoutesModel } from './routes.model';

import { AuthGuard } from './../auth-guard';

import { HomeComponent } from './../home/home.component';
import { WordListComponent } from "./../words/word-list.component";
import { VerbListComponent } from './../verbs/verb-list.component';
import { SentenceListComponent } from './../pages/sentences/sentence-list.component';
import { LoginComponent } from './../auth/login.component';
import { RegistrationComponent } from './../auth/registration.component';
import { UserListComponent } from './../users/user-list.component';
import { WordTaskListComponent } from './../tasks/word-task/word-task-list.component';
import { WordTaskDetailsComponent } from './../tasks/word-task/word-task-details.component';
import { PupilWordTaskListComponent } from './../tasks/word-task/pupil-word-task-list.component';
import { WordTaskWizardComponent } from './../tasks/word-task/word-task-wizard.component';
import { WordTaskResultsComponent } from './../tasks/word-task/word-task-results.component';
import { VerbTaskListComponent } from './../tasks/verb-task/verb-task-list.component';
import { VerbTaskDetailsComponent } from './../tasks/verb-task/verb-task-details.component';
import { VerbTaskWizardComponent } from './../tasks/verb-task/verb-task-wizard.component';
import { VerbTaskResultsComponent } from './../tasks/verb-task/verb-task-results.component';
import { PupilVerbTaskListComponent } from './../tasks/verb-task/pupil-verb-task-list.component';
import { SentenceTaskListComponent } from './../tasks/sentence-task/sentence-task-list.component';
import { SentenceTaskDetailsComponent } from './../tasks/sentence-task/sentence-task-details.component';

import { NotFoundPageComponent } from './../error-pages/not-found-page.component';
import { ForbiddenPageComponent } from './../error-pages/forbidden-page.component';

import { Enums } from './../app-enums';

export class ConfiguredRoutes {
  public static routes: RoutesModel[] = [
    {
      route: { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Administrator, Enums.EUserType.Pupil, Enums.EUserType.Teacher],
    },
    {
      route: { path: 'words', component: WordListComponent, canActivate: [AuthGuard] },
      roles: [],
    },
    {
      route: { path: 'verbs', component: VerbListComponent, canActivate: [AuthGuard] },
      roles: [],
    },
    {
      route: { path: 'sentences', component: SentenceListComponent, canActivate: [AuthGuard] },
      roles: [],
    },
    {
      route: { path: 'sentence-task-management', component: SentenceTaskListComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Administrator, Enums.EUserType.Teacher],
    },
    {
      route: { path: 'user-management', component: UserListComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Administrator],
    },
    {
      route: { path: 'word-task-management', component: WordTaskListComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Teacher, Enums.EUserType.Administrator],
    },
    {
      route: { path: 'verb-task-management', component: VerbTaskListComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Teacher, Enums.EUserType.Administrator],
    },
    {
      route: { path: 'word-task-details/:id', component: WordTaskDetailsComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Teacher, Enums.EUserType.Administrator]
    },
    {
      route: { path: 'verb-task-details/:id', component: VerbTaskDetailsComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Teacher, Enums.EUserType.Administrator]
    },
    {
      route: { path: 'sentence-task-details/:id', component: SentenceTaskDetailsComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Teacher, Enums.EUserType.Administrator]
    },
    {
      route: { path: 'pupil-word-tasks', component: PupilWordTaskListComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Pupil, Enums.EUserType.Administrator],
    },
    {
      route: { path: 'pupil-verb-tasks', component: PupilVerbTaskListComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Pupil, Enums.EUserType.Administrator],
    },
    {
      route: { path: 'word-task-wizard/:id', component: WordTaskWizardComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Pupil, Enums.EUserType.Administrator],
    },
    {
      route: { path: 'verb-task-wizard/:id', component: VerbTaskWizardComponent, canActivate: [AuthGuard] },
      roles: [Enums.EUserType.Pupil, Enums.EUserType.Administrator],
    },
    {
      route: { path: 'word-task-results/:id', component: WordTaskResultsComponent, canActivate: [AuthGuard] },
      roles: [],
    },
    {
      route: { path: 'verb-task-results/:id', component: VerbTaskResultsComponent, canActivate: [AuthGuard] },
      roles: [],
    },
    {
      route: { path: 'login', component: LoginComponent },
      roles: [],
    },
    {
      route: { path: 'register', component: RegistrationComponent },
      roles: [],
    },
    {
      route: { path: 'forbidden', component: ForbiddenPageComponent },
      roles: [],
    },
    {
      route: { path: '**', component: NotFoundPageComponent },
      roles: [],
    }
  ];
}
