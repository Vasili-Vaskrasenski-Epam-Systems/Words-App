using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.VerbTaskModels
{
    public class OrderedVerbTaskModel: BaseModel
    {
        public int Order { get; set; }
        public VerbModel Verb { get; set; }
    }
}
