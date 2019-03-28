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

import { ExistingRoutes} from './existing-routes';

export class ConfiguredRoutes {

  public static routes: Route[] = [
    { path: ExistingRoutes.home, component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: ExistingRoutes.words, component: WordListComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.verbs, component: VerbListComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.sentences, component: SentenceListComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.sentenceTaskManagement, component: SentenceTaskListComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.userManagement, component: UserListComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.wordTaskManagement, component: WordTaskListComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.verbTaskManagement, component: VerbTaskListComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.wordTaskDetails, component: WordTaskDetailsComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.verbTaskDetails, component: VerbTaskDetailsComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.sentenceTaskDetails, component: SentenceTaskDetailsComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.pupilWordTasks, component: PupilWordTaskListComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.pupilVerbTasks, component: PupilVerbTaskListComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.pupilSentenceTasks, component: PupilSentenceTaskListComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.wordTaskWizard, component: WordTaskWizardComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.verbTaskWizard, component: VerbTaskWizardComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.sentenceTaskWizard, component: SentenceTaskWizardComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.wordTaskResults, component: WordTaskResultsComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.verbTaskResults, component: VerbTaskResultsComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.sentenceTaskResults, component: SentenceTaskResultsComponent, canActivate: [AuthGuard] },
    { path: ExistingRoutes.login, component: LoginComponent },
    { path: ExistingRoutes.register, component: RegistrationComponent },
    { path: ExistingRoutes.forbidden, component: ForbiddenPageComponent },
    { path: '', redirectTo: "/" + ExistingRoutes.home, pathMatch: "full" },
    { path: '**', component: NotFoundPageComponent }
  ];

}
