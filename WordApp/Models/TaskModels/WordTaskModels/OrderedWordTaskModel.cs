using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.WordTaskModels
{
    public class OrderedWordTaskModel: BaseModel
    {
        public int Order { get; set; }
        public WordModel Word { get; set; }
    }
}
