using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.WordTaskModels
{
    public class WordTaskModel : BaseTaskModel
    {
        public List<WordModel> Words { get; set; }
    }
}
