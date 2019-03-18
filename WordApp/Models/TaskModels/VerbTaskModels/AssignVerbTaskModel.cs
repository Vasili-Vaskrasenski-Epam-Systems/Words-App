using System.Collections.Generic;
using WordApp.Models.Base;
using WordApp.Models.TaskModels.WordTaskModels;

namespace WordApp.Models.TaskModels.VerbTaskModels
{
    public class AssignVerbTaskModel: BaseAssignableModel
    {
        public VerbTaskModel VerbTask { get; set; }
        public List<AnsweredWordModel> AnsweredWords { get; set; }
    }
}
