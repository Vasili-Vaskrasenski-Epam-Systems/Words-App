using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances.Sentence
{
    public class SentenceAnswerEntity: BaseAnswerEntity
    {
        public virtual List<RelAnswerSentenceEntity> AnsweredSentences { get; set; }
    }
}
