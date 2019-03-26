export module Enums {

  export enum EUserType {
    Pupil = 1,
    Administrator = 2,
    Teacher = 3
  }

  export enum ETaskStatus {
    Unknown = 0,
    Open = 1,
    InProgress = 2,
    Done = 3,
    Failed = 4,
  }

  export enum ERoutes {
    Words = <any>"words",
    Verbs = <any>"verbs",
    Sentences = <any>"sentences",
    SentenceTaskManagement = <any>"sentence-task-management",
    UserManagement = <any>"user-management",
    WordTaskManagement = <any>"word-task-management",
    VerbTaskManagement = <any>"verb-task-management",
    WordTaskDetails = <any>"word-task-details/:id",
    VerbTaskDetails = <any>"verb-task-details/:id",
    SentenceTaskDetails = <any>"sentence-task-details/:id",
    PupilWordTasks = <any>"pupil-word-tasks",
    PupilVerbTasks = <any>"pupil-verb-tasks",
    PupilSentenceTasks = <any>"pupil-sentence-tasks",
    WordTaskWizard = <any>"word-task-wizard/:id",
    VerbTaskWizard = <any>"verb-task-wizard/:id",
    SentenceTaskWizard = <any>"sentence-task-wizard/:id",
    WordTaskResults = <any>"word-task-results/:id",
    VerbTaskResults = <any>"verb-task-results/:id",
    SentenceTaskResults = <any>"sentence-task-results/:id",
    Login = <any>"login",
    Register = <any>"register",
    Forbidden = <any>"forbidden",
    Other = <any>"**",
    Home = <any>""
  }
}
