using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.WordTaskModels
{
    public class OrderedTaskWordModel: BaseModel
    {
        public int Order { get; set; }
        public bool IsTranslation { get; set; }
        public WordModel Word { get; set; }
    }
}
