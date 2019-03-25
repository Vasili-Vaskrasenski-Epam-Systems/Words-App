using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.SentenceTaskModels
{
    public class AnsweredSentenceModel: BaseModel
    {
        public AnswerModel Answer { get; set; }
        public SentenceTaskModel Sentence { get; set; }
    }
}
