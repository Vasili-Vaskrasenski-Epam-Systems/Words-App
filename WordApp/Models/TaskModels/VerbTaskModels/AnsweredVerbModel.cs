namespace WordApp.Models.TaskModels.VerbTaskModels
{
    public class AnsweredVerbModel
    {
        public virtual AnswerModel Answer { get; set; }
        public virtual VerbModel Verb { get; set; }
    }
}
