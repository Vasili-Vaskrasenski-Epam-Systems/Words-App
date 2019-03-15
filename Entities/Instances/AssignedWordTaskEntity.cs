using System;
using System.Collections.Generic;
using Entities.Enums;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class AssignedWordTaskEntity: BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid WordTaskId { get; set; }
        public TaskStatus TaskStatus { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime? CompleteDate { get; set; }
        public virtual UserEntity User { get; set; }
        public virtual WordTaskEntity WordTask { get; set; }
        public virtual List<AnsweredWordEntity> AnsweredWords { get; set; }
    }
}
