using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances.Task.WordTask
{
    public class WordTaskEntity: BaseTaskEntity
    {
        public virtual List<RelTaskWordEntity> TaskWords { get; set; }
        public virtual List<AssignedWordTaskEntity> AssignedWordTasks { get; set; }
        public bool IsTranslationTask { get; set; }
    }
}
