import { Route } from '@angular/router';
import { AuthGuard } from './../auth-guard';

import { HomeComponent } from './../home/home.component';
import { WordListComponent } from "./../pages/words/word-list.component";
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
import { SentenceTaskWizardComponent } from './../tasks/sentence-task/sentence-task-wizard.component';
import { PupilSentenceTaskListComponent } from './../tasks/sentence-task/pupil-sentence-task-list.component';
import { SentenceTaskResultsComponent } from './../tasks/sentence-task/sentence-task-results.component';

import { NotFoundPageComponent } from './../error-pages/not-found-page.component';
import { ForbiddenPageComponent } from './../error-pages/forbidden-page.component';

import { Enums } from './../app-enums';

export class ConfiguredRoutes {
  public static routes: Route[] = [
    { path: Enums.ERoutes.Home.toString(), component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: Enums.ERoutes.Words.toString(), component: WordListComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.Verbs.toString(), component: VerbListComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.Sentences.toString(), component: SentenceListComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.SentenceTaskManagement.toString(), component: SentenceTaskListComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.UserManagement.toString(), component: UserListComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.WordTaskManagement.toString(), component: WordTaskListComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.VerbTaskManagement.toString(), component: VerbTaskListComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.WordTaskDetails.toString(), component: WordTaskDetailsComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.VerbTaskDetails.toString(), component: VerbTaskDetailsComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.SentenceTaskDetails.toString(), component: SentenceTaskDetailsComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.PupilWordTasks.toString(), component: PupilWordTaskListComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.PupilVerbTasks.toString(), component: PupilVerbTaskListComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.PupilSentenceTasks.toString(), component: PupilSentenceTaskListComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.WordTaskWizard.toString(), component: WordTaskWizardComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.VerbTaskWizard.toString(), component: VerbTaskWizardComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.SentenceTaskWizard.toString(), component: SentenceTaskWizardComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.WordTaskResults.toString(), component: WordTaskResultsComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.VerbTaskResults.toString(), component: VerbTaskResultsComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.SentenceTaskResults.toString(), component: SentenceTaskResultsComponent, canActivate: [AuthGuard] },
    { path: Enums.ERoutes.Login.toString(), component: LoginComponent },
    { path: Enums.ERoutes.Register.toString(), component: RegistrationComponent },
    { path: Enums.ERoutes.Forbidden.toString(), component: ForbiddenPageComponent },
    { path: Enums.ERoutes.Other.toString(), component: NotFoundPageComponent },
  ];
}
