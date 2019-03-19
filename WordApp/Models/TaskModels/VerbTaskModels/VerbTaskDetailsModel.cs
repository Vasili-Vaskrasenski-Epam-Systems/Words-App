using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.VerbTaskModels
{
    public class VerbTaskDetailsModel: BaseModel
    {
        public VerbTaskModel VerbTask { get; set; }
        public List<AssignVerbTaskModel> Assignees { get; set; }
        public List<OrderedVerbTaskModel> Verbs { get; set; }
    }
}
