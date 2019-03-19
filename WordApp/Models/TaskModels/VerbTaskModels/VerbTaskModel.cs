using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.VerbTaskModels
{
    public class VerbTaskModel: BaseTaskModel
    {
        public List<OrderedVerbTaskModel> Verbs { get; set; }
    }
}
