import { Route } from '@angular/router';
import { AuthGuard } from './../auth-guard';

import { HomeComponent } from './../pages/home/home.component';
import { WordListComponent } from "./../pages/words/word-list.component";
import { VerbListComponent } from './../pages/verbs/verb-list.component';
import { SentenceListComponent } from './../pages/sentences/sentence-list.component';
import { LoginComponent } from './../auth/login.component';
import { RegistrationComponent } from './../auth/registration.component';
import { UserListComponent } from './../pages/users/user-list.component';
import { WordTaskListComponent } from './../pages/tasks/word-task/word-task-list.component';
import { WordTaskDetailsComponent } from './../pages/tasks/word-task/word-task-details.component';
import { PupilWordTaskListComponent } from './../pages/tasks/word-task/pupil-word-task-list.component';
import { WordTaskWizardComponent } from './../pages/tasks/word-task/word-task-wizard.component';
import { WordTaskResultsComponent } from './../pages/tasks/word-task/word-task-results.component';
import { VerbTaskListComponent } from './../pages/tasks/verb-task/verb-task-list.component';
import { VerbTaskDetailsComponent } from './../pages/tasks/verb-task/verb-task-details.component';
import { VerbTaskWizardComponent } from './../pages/tasks/verb-task/verb-task-wizard.component';
import { VerbTaskResultsComponent } from './../pages/tasks/verb-task/verb-task-results.component';
import { PupilVerbTaskListComponent } from './../pages/tasks/verb-task/pupil-verb-task-list.component';
import { SentenceTaskListComponent } from './../pages/tasks/sentence-task/sentence-task-list.component';
import { SentenceTaskDetailsComponent } from './../pages/tasks/sentence-task/sentence-task-details.component';
import { SentenceTaskWizardComponent } from './../pages/tasks/sentence-task/sentence-task-wizard.component';
import { PupilSentenceTaskListComponent } from './../pages/tasks/sentence-task/pupil-sentence-task-list.component';
import { SentenceTaskResultsComponent } from './../pages/tasks/sentence-task/sentence-task-results.component';

import { NotFoundPageComponent } from './../pages/error-pages/not-found-page.component';
import { ForbiddenPageComponent } from './../pages/error-pages/forbidden-page.component';

import { ERoutes } from './../app-enums';

export class ConfiguredRoutes {
  public static routes: Route[] = [
    { path: ERoutes.Home.toString(), component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: ERoutes.Words.toString(), component: WordListComponent, canActivate: [AuthGuard] },
    { path: ERoutes.Verbs.toString(), component: VerbListComponent, canActivate: [AuthGuard] },
    { path: ERoutes.Sentences.toString(), component: SentenceListComponent, canActivate: [AuthGuard] },
    { path: ERoutes.SentenceTaskManagement.toString(), component: SentenceTaskListComponent, canActivate: [AuthGuard] },
    { path: ERoutes.UserManagement.toString(), component: UserListComponent, canActivate: [AuthGuard] },
    { path: ERoutes.WordTaskManagement.toString(), component: WordTaskListComponent, canActivate: [AuthGuard] },
    { path: ERoutes.VerbTaskManagement.toString(), component: VerbTaskListComponent, canActivate: [AuthGuard] },
    { path: ERoutes.WordTaskDetails.toString(), component: WordTaskDetailsComponent, canActivate: [AuthGuard] },
    { path: ERoutes.VerbTaskDetails.toString(), component: VerbTaskDetailsComponent, canActivate: [AuthGuard] },
    { path: ERoutes.SentenceTaskDetails.toString(), component: SentenceTaskDetailsComponent, canActivate: [AuthGuard] },
    { path: ERoutes.PupilWordTasks.toString(), component: PupilWordTaskListComponent, canActivate: [AuthGuard] },
    { path: ERoutes.PupilVerbTasks.toString(), component: PupilVerbTaskListComponent, canActivate: [AuthGuard] },
    { path: ERoutes.PupilSentenceTasks.toString(), component: PupilSentenceTaskListComponent, canActivate: [AuthGuard] },
    { path: ERoutes.WordTaskWizard.toString(), component: WordTaskWizardComponent, canActivate: [AuthGuard] },
    { path: ERoutes.VerbTaskWizard.toString(), component: VerbTaskWizardComponent, canActivate: [AuthGuard] },
    { path: ERoutes.SentenceTaskWizard.toString(), component: SentenceTaskWizardComponent, canActivate: [AuthGuard] },
    { path: ERoutes.WordTaskResults.toString(), component: WordTaskResultsComponent, canActivate: [AuthGuard] },
    { path: ERoutes.VerbTaskResults.toString(), component: VerbTaskResultsComponent, canActivate: [AuthGuard] },
    { path: ERoutes.SentenceTaskResults.toString(), component: SentenceTaskResultsComponent, canActivate: [AuthGuard] },
    { path: ERoutes.Login.toString(), component: LoginComponent },
    { path: ERoutes.Register.toString(), component: RegistrationComponent },
    { path: ERoutes.Forbidden.toString(), component: ForbiddenPageComponent },
    { path: ERoutes.Other.toString(), component: NotFoundPageComponent }
  ];

}
