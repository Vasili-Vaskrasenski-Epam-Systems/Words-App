using System;
using Entities.Instances.Base;
using Entities.Instances.Task;
using Entities.Instances.Task.WordTask;

namespace Entities.Instances.Word
{
    public class RelAnswerWordEntity: BaseEntity
    {
        public Guid AssignedTaskId { get; set; }
        public Guid WordId { get; set; }
        public Guid AnswerId { get; set; }
        public virtual AssignedWordTaskEntity AssignedWordTask { get; set; }
        public virtual WordAnswerEntity Answer { get; set; }
        public virtual WordEntity Word { get; set; }
    }
}
