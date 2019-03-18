using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Instances.Base
{
    public abstract class BaseAssignedTaskEntity: BaseEntity
    {
        public Guid UserId { get; set; }
        public TaskStatus TaskStatus { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime? CompleteDate { get; set; }
        public virtual UserEntity User { get; set; }
    }
}
