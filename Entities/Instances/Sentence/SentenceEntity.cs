using System.Collections.Generic;
using Entities.Instances.Base;
using Entities.Instances.Task.SentenceTask;

namespace Entities.Instances.Sentence
{
    public class SentenceEntity: BaseEntity
    {
        public string Text { get; set; }
        public List<SentenceTranslationEntity> Translations { get; set; }
        public List<RelSentenceTaskEntity> SentenceTasks { get; set; }
        public List<RelAnswerSentenceEntity> AnsweredSentences { get; set; }
    }
}
