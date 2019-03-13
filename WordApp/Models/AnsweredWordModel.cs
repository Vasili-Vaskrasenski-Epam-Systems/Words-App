using WordApp.Models.Base;

namespace WordApp.Models
{
    public class AnsweredWordModel: BaseModel
    {
        public virtual AssignableWordTaskModel AssignedWordTask { get; set; }
        public virtual AnswerModel Answer { get; set; }
        public virtual WordModel Word { get; set; }
    }
}
