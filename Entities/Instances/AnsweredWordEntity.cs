using System;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class AnsweredWordEntity: BaseEntity
    {
        public Guid AssignedTaskId { get; set; }
        public Guid WordId { get; set; }
        public Guid AnswerId { get; set; }
        public virtual AssignedWordTaskEntity AssignedWordTask { get; set; }
        public virtual AnswerEntity Answer { get; set; }
        public virtual WordEntity Word { get; set; }
    }
}
