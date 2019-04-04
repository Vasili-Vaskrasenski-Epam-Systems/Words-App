import { EUserType } from './../app-enums';
import { RoutesModel } from './routes.model';
import { ExistingRoutes } from './existing-routes';

export class SecuredRoutes {
  public static routes: RoutesModel[] = [
    {
      route: ExistingRoutes.home,
      roles: [EUserType.Administrator, EUserType.Pupil, EUserType.Teacher],
    },
    {
      route: ExistingRoutes.words,
      roles: [],
    },
    {
      route: ExistingRoutes.verbs,
      roles: [],
    },
    {
      route: ExistingRoutes.sentences,
      roles: [],
    },
    {
      route: ExistingRoutes.sentenceTaskManagement,
      roles: [EUserType.Administrator, EUserType.Teacher],
    },
    {
      route: ExistingRoutes.userManagement,
      roles: [EUserType.Administrator],
    },
    {
      route: ExistingRoutes.wordTaskManagement,
      roles: [EUserType.Teacher, EUserType.Administrator],
    },
    {
      route: ExistingRoutes.verbTaskManagement,
      roles: [EUserType.Teacher, EUserType.Administrator],
    },
    {
      route: ExistingRoutes.wordTaskDetails,
      roles: [EUserType.Teacher, EUserType.Administrator]
    },
    {
      route: ExistingRoutes.verbTaskDetails,
      roles: [EUserType.Teacher, EUserType.Administrator]
    },
    {
      route: ExistingRoutes.sentenceTaskDetails,
      roles: [EUserType.Teacher, EUserType.Administrator]
    },
    {
      route: ExistingRoutes.pupilWordTasks,
      roles: [EUserType.Pupil, EUserType.Administrator],
    },
    {
      route: ExistingRoutes.pupilVerbTasks,
      roles: [EUserType.Pupil],
    },
    {
      route: ExistingRoutes.pupilSentenceTasks,
      roles: [EUserType.Pupil, EUserType.Administrator],
    },
    {
      route: ExistingRoutes.wordTaskWizard,
      roles: [EUserType.Pupil, EUserType.Administrator],
    },
    {
      route: ExistingRoutes.verbTaskWizard,
      roles: [EUserType.Pupil, EUserType.Administrator],
    },
    {
      route: ExistingRoutes.sentenceTaskWizard,
      roles: [EUserType.Pupil, EUserType.Administrator],
    },
    {
      route: ExistingRoutes.wordTaskResults,
      roles: [],
    },
    {
      route: ExistingRoutes.verbTaskResults,
      roles: [],
    },
    {
      route: ExistingRoutes.sentenceTaskResults,
      roles: [],
    },
    {
      route: ExistingRoutes.login,
      roles: [],
    },
    {
      route: ExistingRoutes.loginGoogle,
      roles: [],
    },
    {
      route: ExistingRoutes.register,
      roles: [],
    },
    {
      route: ExistingRoutes.forbidden,
      roles: [],
    },
    {
      route: ExistingRoutes.other,
      roles: [],
    }
  ];
}
