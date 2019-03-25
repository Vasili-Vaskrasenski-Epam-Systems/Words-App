using WordApp.Models.Base;
using WordApp.Models.Sentences;

namespace WordApp.Models.TaskModels.SentenceTaskModels
{
    public class OrderedSentenceTaskModel: BaseModel
    {
        public int Order { get; set; }
        public SentenceModel Sentence { get; set; }
    }
}
