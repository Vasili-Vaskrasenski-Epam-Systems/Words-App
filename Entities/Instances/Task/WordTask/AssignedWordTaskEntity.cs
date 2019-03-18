using System;
using System.Collections.Generic;
using Entities.Instances.Base;
using Entities.Instances.Word;

namespace Entities.Instances.Task.WordTask
{
    public class AssignedWordTaskEntity: BaseAssignedTaskEntity
    {
        public Guid WordTaskId { get; set; }
        public virtual WordTaskEntity WordTask { get; set; }
        public virtual List<RelAnswerWordEntity> AnsweredWords { get; set; }
    }
}
