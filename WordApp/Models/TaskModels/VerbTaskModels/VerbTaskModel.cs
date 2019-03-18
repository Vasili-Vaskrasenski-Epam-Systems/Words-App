using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.VerbTaskModels
{
    public class VerbTaskModel: BaseTaskModel
    {
        public List<VerbModel> Verbs { get; set; }
    }
}
