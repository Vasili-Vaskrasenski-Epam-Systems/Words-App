using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.WordTaskModels
{
    public class WordTaskModel : BaseTaskModel
    {
        public List<OrderedWordTaskModel> Words { get; set; }
        public bool IsTranslationTask { get; set; }
    }
}
