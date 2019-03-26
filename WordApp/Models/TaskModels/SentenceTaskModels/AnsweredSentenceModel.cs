using WordApp.Models.Base;
using WordApp.Models.Sentences;

namespace WordApp.Models.TaskModels.SentenceTaskModels
{
    public class AnsweredSentenceModel: BaseModel
    {
        public SentenceAnswerModel Answer { get; set; }
        public SentenceModel Sentence { get; set; }
    }
}
