using System;
using Entities.Instances.Base;
using Entities.Instances.Verb;

namespace Entities.Instances.Task.VerbTask
{
    public class RelVerbTaskEntity: BaseEntity
    {
        public Guid VerbTaskId { get; set; }
        public Guid VerbId { get; set; }
        public virtual VerbTaskEntity VerbTask { get; set; }
        public virtual VerbEntity Verb { get; set; }
        public int Order { get; set; }
    }
}
