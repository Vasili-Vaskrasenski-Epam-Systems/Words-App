import { Enums } from './../app-enums';
import { RoutesModel } from './routes.model';

export class SecuredRoutes {
  public static routes: RoutesModel[] = [
    {
      route: Enums.ERoutes.Home,
      roles: [Enums.EUserType.Administrator, Enums.EUserType.Pupil, Enums.EUserType.Teacher],
    },
    {
      route: Enums.ERoutes.Words,
      roles: [],
    },
    {
      route: Enums.ERoutes.Verbs,
      roles: [],
    },
    {
      route: Enums.ERoutes.Sentences,
      roles: [],
    },
    {
      route: Enums.ERoutes.SentenceTaskManagement,
      roles: [Enums.EUserType.Administrator, Enums.EUserType.Teacher],
    },
    {
      route: Enums.ERoutes.UserManagement,
      roles: [Enums.EUserType.Administrator],
    },
    {
      route: Enums.ERoutes.WordTaskManagement,
      roles: [Enums.EUserType.Teacher, Enums.EUserType.Administrator],
    },
    {
      route: Enums.ERoutes.VerbTaskManagement,
      roles: [Enums.EUserType.Teacher, Enums.EUserType.Administrator],
    },
    {
      route: Enums.ERoutes.WordTaskDetails,
      roles: [Enums.EUserType.Teacher, Enums.EUserType.Administrator]
    },
    {
      route: Enums.ERoutes.VerbTaskDetails,
      roles: [Enums.EUserType.Teacher, Enums.EUserType.Administrator]
    },
    {
      route: Enums.ERoutes.SentenceTaskDetails,
      roles: [Enums.EUserType.Teacher, Enums.EUserType.Administrator]
    },
    {
      route: Enums.ERoutes.PupilWordTasks,
      roles: [Enums.EUserType.Pupil, Enums.EUserType.Administrator],
    },
    {
      route: Enums.ERoutes.PupilVerbTasks,
      roles: [Enums.EUserType.Pupil],
    },
    {
      route: Enums.ERoutes.PupilSentenceTasks,
      roles: [Enums.EUserType.Pupil, Enums.EUserType.Administrator],
    },
    {
      route: Enums.ERoutes.WordTaskWizard,
      roles: [Enums.EUserType.Pupil, Enums.EUserType.Administrator],
    },
    {
      route: Enums.ERoutes.VerbTaskWizard,
      roles: [Enums.EUserType.Pupil, Enums.EUserType.Administrator],
    },
    {
      route: Enums.ERoutes.SentenceTaskWizard,
      roles: [Enums.EUserType.Pupil, Enums.EUserType.Administrator],
    },
    {
      route: Enums.ERoutes.WordTaskResults,
      roles: [],
    },
    {
      route: Enums.ERoutes.VerbTaskResults,
      roles: [],
    },
    {
      route: Enums.ERoutes.SentenceTaskResults,
      roles: [],
    },
    {
      route: Enums.ERoutes.Login,
      roles: [],
    },
    {
      route: Enums.ERoutes.Register,
      roles: [],
    },
    {
      route: Enums.ERoutes.Forbidden,
      roles: [],
    },
    {
      route: Enums.ERoutes.Other,
      roles: [],
    }
  ];
}
