using System;
using System.Collections.Generic;
using Entities.Enums;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class AssignedTaskEntity: BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid TaskId { get; set; }
        public TaskStatus TaskStatus { get; set; }
        //public DateTime Deadline { get; set; }
        public virtual UserEntity User { get; set; }
        public virtual TaskEntity Task { get; set; }
        public virtual List<AnsweredWordEntity> AnsweredWords { get; set; }
    }
}
