using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class WordTaskEntity: BaseTaskEntity
    {
        public virtual List<TaskWordEntity> TaskWords { get; set; }
        public virtual List<AssignedWordTaskEntity> AssignedWordTasks { get; set; }
    }
}
