using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.VerbTaskModels
{
    public class OrderedTaskVerbModel: BaseModel
    {
        public int Order { get; set; }
        public VerbModel Verb { get; set; }
    }
}
