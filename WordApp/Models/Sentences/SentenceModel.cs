using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models.Sentences
{
    public class SentenceModel: BaseModel
    {
        public string Text { get; set; }
        public List<SentenceTranslationModel> Translations { get; set; }
    }
}
