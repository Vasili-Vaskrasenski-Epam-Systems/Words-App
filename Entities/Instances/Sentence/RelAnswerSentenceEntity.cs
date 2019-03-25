using System;
using Entities.Instances.Base;
using Entities.Instances.Task.SentenceTask;

namespace Entities.Instances.Sentence
{
    public class RelAnswerSentenceEntity: BaseEntity
    {
        public Guid SentenceAnswerId { get; set; }
        public virtual SentenceAnswerEntity SentenceAnswer { get; set; }
        public Guid SentenceId { get; set; }
        public virtual SentenceEntity Sentence { get; set; }
        public Guid AssignedSentenceTaskId { get; set; }
        public virtual AssignedSentenceTaskEntity AssignedSentenceTask { get; set; }
    }
}
