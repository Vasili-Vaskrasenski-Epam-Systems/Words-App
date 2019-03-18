using System;
using System.Collections.Generic;
using Entities.Instances.Base;
using Entities.Instances.Verb;

namespace Entities.Instances.Task.VerbTask
{
    public class AssignedVerbTaskEntity: BaseAssignedTaskEntity
    {
        public Guid VerbTaskId { get; set; }
        public virtual VerbTaskEntity VerbTask { get; set; }
        public virtual List<RelAnsweredVerbEntity> AnsweredVerbs { get; set; }
    }
}
