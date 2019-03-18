using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.WordTaskModels
{
    public class AssignableWordTaskModel: BaseAssignableModel
    {
        public WordTaskModel WordTask { get; set; }
        public List<AnsweredWordModel> AnsweredWords { get; set; }
    }
}
