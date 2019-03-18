using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models
{
    public class VerbModel: BaseModel
    {
        public string CommonWord { get; set; }
        public List<WordModel> Words { get; set; }
    }
}
