using System;
using Entities.Instances.Base;
using Entities.Instances.Task.VerbTask;

namespace Entities.Instances.Verb
{
    public class RelAnsweredVerbEntity: BaseEntity
    {
        public Guid AnswerId { get; set; }
        public Guid VerbId { get; set; }
        public Guid AssignedVerbTaskId { get; set; }
        public virtual AssignedVerbTaskEntity AssignedVerbTask { get; set; }
        public virtual VerbAnswerEntity Answer { get; set; }
        public virtual VerbEntity Verb { get; set; }

    }
}
