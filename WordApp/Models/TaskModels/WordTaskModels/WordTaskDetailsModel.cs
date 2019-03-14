using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.WordTaskModels
{
    public class WordTaskDetailsModel: BaseModel
    {
        public WordTaskModel WordTask { get; set; }
        public List<AssignableWordTaskModel> Assignees { get; set; }
        public List<OrderedTaskWordModel> Words { get; set; }
    }
}
