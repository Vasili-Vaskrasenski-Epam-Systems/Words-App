using System.Collections.Generic;

namespace WordApp.Models
{
    public class IrregularVerbModel: BaseModel
    {
        public string Word { get; set; }
        public List<WordModel> WordModels { get; set; }
    }
}
