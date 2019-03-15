using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.WordTaskModels
{
    public class AnsweredWordModel: BaseModel
    {
        public virtual AnswerModel Answer { get; set; }
        public virtual WordModel Word { get; set; }
    }
}
