using System.Collections.Generic;

namespace WordApp.Models
{
    public class IrregularVerbModel: BaseModel
    {
        public string CommonWord { get; set; }
        public List<WordModel> Words { get; set; }
    }
}
