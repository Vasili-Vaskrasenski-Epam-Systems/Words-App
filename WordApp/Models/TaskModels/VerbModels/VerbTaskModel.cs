using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.VerbModels
{
    public class VerbTaskModel: BaseTaskModel
    {
        public List<VerbModel> Verbs { get; set; }
    }
}
