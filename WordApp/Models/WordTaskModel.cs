using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models
{
    public class WordTaskModel : BaseTaskModel
    {
        public List<WordModel> Words { get; set; }
    }
}
