using System;
using Entities.Instances.Base;

namespace Entities.Instances.Task.SentenceTask
{
    public class RelSentenceTaskEntity: BaseEntity
    {
        public Guid SentenceId { get; set; }
        public virtual Sentence.SentenceEntity Sentence { get; set; }
        public Guid TaskId { get; set; }
        public virtual SentenceTaskEntity Task { get; set; }
        public int Order { get; set; }
    }
}
