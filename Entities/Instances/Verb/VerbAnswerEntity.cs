using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances.Verb
{
    public class VerbAnswerEntity: BaseAnswerEntity
    {
        public virtual List<RelAnsweredVerbEntity> AnsweredVerbs { get; set; }
    }
}
