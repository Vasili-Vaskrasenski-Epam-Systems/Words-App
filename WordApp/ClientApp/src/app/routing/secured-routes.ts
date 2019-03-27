import { ERoutes, EUserType } from './../app-enums';
import { RoutesModel } from './routes.model';

export class SecuredRoutes {
  public static routes: RoutesModel[] = [
    {
      route: ERoutes.Home,
      roles: [EUserType.Administrator, EUserType.Pupil, EUserType.Teacher],
    },
    {
      route: ERoutes.Words,
      roles: [],
    },
    {
      route: ERoutes.Verbs,
      roles: [],
    },
    {
      route: ERoutes.Sentences,
      roles: [],
    },
    {
      route: ERoutes.SentenceTaskManagement,
      roles: [EUserType.Administrator, EUserType.Teacher],
    },
    {
      route: ERoutes.UserManagement,
      roles: [EUserType.Administrator],
    },
    {
      route: ERoutes.WordTaskManagement,
      roles: [EUserType.Teacher, EUserType.Administrator],
    },
    {
      route: ERoutes.VerbTaskManagement,
      roles: [EUserType.Teacher, EUserType.Administrator],
    },
    {
      route: ERoutes.WordTaskDetails,
      roles: [EUserType.Teacher, EUserType.Administrator]
    },
    {
      route: ERoutes.VerbTaskDetails,
      roles: [EUserType.Teacher, EUserType.Administrator]
    },
    {
      route: ERoutes.SentenceTaskDetails,
      roles: [EUserType.Teacher, EUserType.Administrator]
    },
    {
      route: ERoutes.PupilWordTasks,
      roles: [EUserType.Pupil, EUserType.Administrator],
    },
    {
      route: ERoutes.PupilVerbTasks,
      roles: [EUserType.Pupil],
    },
    {
      route: ERoutes.PupilSentenceTasks,
      roles: [EUserType.Pupil, EUserType.Administrator],
    },
    {
      route: ERoutes.WordTaskWizard,
      roles: [EUserType.Pupil, EUserType.Administrator],
    },
    {
      route: ERoutes.VerbTaskWizard,
      roles: [EUserType.Pupil, EUserType.Administrator],
    },
    {
      route: ERoutes.SentenceTaskWizard,
      roles: [EUserType.Pupil, EUserType.Administrator],
    },
    {
      route: ERoutes.WordTaskResults,
      roles: [],
    },
    {
      route: ERoutes.VerbTaskResults,
      roles: [],
    },
    {
      route: ERoutes.SentenceTaskResults,
      roles: [],
    },
    {
      route: ERoutes.Login,
      roles: [],
    },
    {
      route: ERoutes.Register,
      roles: [],
    },
    {
      route: ERoutes.Forbidden,
      roles: [],
    },
    {
      route: ERoutes.Other,
      roles: [],
    }
  ];
}
