using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.SentenceTaskModels
{
    public class SentenceTaskDetailsModel: BaseModel
    {
        public SentenceTaskModel SentenceTask { get; set; }
        public List<AssignSentenceTaskModel> Assignees { get; set; }
        public List<OrderedSentenceTaskModel> Sentences { get; set; }
    }
}
