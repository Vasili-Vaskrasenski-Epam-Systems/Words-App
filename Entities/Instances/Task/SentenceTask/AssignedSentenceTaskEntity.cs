using System;
using System.Collections.Generic;
using Entities.Instances.Base;
using Entities.Instances.Sentence;

namespace Entities.Instances.Task.SentenceTask
{
    public class AssignedSentenceTaskEntity: BaseAssignedTaskEntity
    {
        public Guid SentenceTaskId { get; set; }
        public virtual SentenceTaskEntity SentenceTask { get; set; }
        public virtual List<RelAnswerSentenceEntity> AnsweredSentences { get; set; }
    }
}
