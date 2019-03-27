using System;
using Entities.Instances.User;
using TaskStatus = Entities.Enums.TaskStatus;

namespace Entities.Instances.Base
{
    public abstract class BaseAssignedTaskEntity : BaseEntity
    {
        public Guid UserId { get; set; }
        public TaskStatus TaskStatus { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime? CompleteDate { get; set; }
        public virtual UserEntity User { get; set; }
    }
}
