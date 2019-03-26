using System;
using System.Collections.Generic;
using System.Text;
using Entities.Instances.Base;

namespace Entities.Instances.Task.SentenceTask
{
    public class SentenceTaskEntity: BaseTaskEntity
    {
        public virtual List<RelSentenceTaskEntity> Sentences { get; set; }
        public virtual List<AssignedSentenceTaskEntity> AssignedSentenceTasks { get; set; }
    }
}
