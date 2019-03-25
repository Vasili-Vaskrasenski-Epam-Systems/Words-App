using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.SentenceTaskModels
{
    public class AssignSentenceTaskModel: BaseAssignableModel
    {
        public SentenceTaskModel SentenceTask { get; set; }
        public List<AnsweredSentenceModel> AnsweredSentences { get; set; }
    }
}
