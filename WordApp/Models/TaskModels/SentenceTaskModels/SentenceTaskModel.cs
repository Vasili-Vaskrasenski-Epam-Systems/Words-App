using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.SentenceTaskModels
{
    public class SentenceTaskModel: BaseTaskModel
    {
        public List<OrderedSentenceTaskModel> Sentences { get; set; }
    }
}
