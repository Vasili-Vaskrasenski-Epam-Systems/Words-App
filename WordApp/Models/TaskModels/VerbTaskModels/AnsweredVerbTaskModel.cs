using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.VerbTaskModels
{
    public class AnsweredVerbTaskModel: BaseModel
    {
        public AssignVerbTaskModel VerbTask { get; set; }
        public List<AnsweredVerbModel> AnsweredVerbs { get; set; }
    }
}
