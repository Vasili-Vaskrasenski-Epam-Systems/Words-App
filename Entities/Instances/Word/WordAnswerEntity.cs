using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances.Word
{
    public class WordAnswerEntity: BaseAnswerEntity
    {
        public virtual List<RelAnswerWordEntity> AnsweredWords { get; set; }
    }
}
