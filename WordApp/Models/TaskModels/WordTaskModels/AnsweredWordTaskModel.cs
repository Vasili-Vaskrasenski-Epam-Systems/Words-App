using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.WordTaskModels
{
    public class AnsweredWordTaskModel: BaseModel
    {
        public AssignableWordTaskModel WordTask { get; set; }
        public List<AnsweredWordModel> AnsweredWords { get; set; }
    }
}
