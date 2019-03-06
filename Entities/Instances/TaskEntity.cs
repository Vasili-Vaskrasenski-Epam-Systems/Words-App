using System.Collections.Generic;
using Entities.Enums;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class TaskEntity: BaseEntity
    {
        public string Name { get; set; }
        public TaskType TaskType { get; set; }
        public virtual List<TaskWordEntity> TaskWords { get; set; }
        public virtual List<AssignedTaskEntity> AssignedTasks { get; set; }
    }
}
