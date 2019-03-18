using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances.Verb
{
    public class VerbAnswerEntity: BaseEntity
    {
        public string FirstForm { get; set; }
        public string SecondForm { get; set; }
        public string ThirdForm { get; set; }
        public virtual List<RelAnsweredVerbEntity> AnsweredVerbs { get; set; }
    }
}
