using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class AnswerEntity: BaseEntity
    {
        public string Answer { get; set; }
        public virtual List<AnsweredWordEntity> AnsweredWords { get; set; }
    }
}
