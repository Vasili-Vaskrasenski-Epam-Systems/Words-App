export class ExistingRoutes {
  public static words = "words";
  public static verbs = "verbs";
  public static sentences = "sentences";
  public static sentenceTaskManagement = "sentence-task-management";
  public static userManagement = "user-management";
  public static wordTaskManagement = "word-task-management";
  public static verbTaskManagement = "verb-task-management";
  public static wordTaskDetails = "word-task-details/:id";
  public static verbTaskDetails = "verb-task-details/:id";
  public static sentenceTaskDetails = "sentence-task-details/:id";
  public static pupilWordTasks = "pupil-word-tasks";
  public static pupilVerbTasks = "pupil-verb-tasks";
  public static pupilSentenceTasks = "pupil-sentence-tasks";
  public static wordTaskWizard = "word-task-wizard/:id";
  public static verbTaskWizard = "verb-task-wizard/:id";
  public static sentenceTaskWizard = "sentence-task-wizard/:id";
  public static wordTaskResults = "word-task-results/:id";
  public static verbTaskResults = "verb-task-results/:id";
  public static sentenceTaskResults = "sentence-task-results/:id";
  public static login = "login";
  public static register = "register";
  public static forbidden = "forbidden";
  public static home = "home";
  public static loginGoogle = "login-google";
  public static empty = "";
  public static other = "**";

  public static routes: string[] = new Array(
    ExistingRoutes.words,
    ExistingRoutes.verbs,
    ExistingRoutes.sentences,
    ExistingRoutes.sentenceTaskManagement,
    ExistingRoutes.userManagement,
    ExistingRoutes.wordTaskManagement,
    ExistingRoutes.verbTaskManagement,
    ExistingRoutes.wordTaskDetails,
    ExistingRoutes.verbTaskDetails,
    ExistingRoutes.sentenceTaskDetails,
    ExistingRoutes.pupilWordTasks,
    ExistingRoutes.pupilSentenceTasks,
    ExistingRoutes.pupilVerbTasks,
    ExistingRoutes.sentenceTaskWizard,
    ExistingRoutes.verbTaskWizard,
    ExistingRoutes.wordTaskWizard,
    ExistingRoutes.verbTaskResults,
    ExistingRoutes.wordTaskResults,
    ExistingRoutes.sentenceTaskResults,
    ExistingRoutes.login,
    ExistingRoutes.register,
    ExistingRoutes.forbidden,
    ExistingRoutes.home,
    ExistingRoutes.empty,
    ExistingRoutes.other
  );
}
