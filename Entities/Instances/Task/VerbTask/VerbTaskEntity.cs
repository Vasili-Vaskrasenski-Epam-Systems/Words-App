using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances.Task.VerbTask
{
    public class VerbTaskEntity : BaseTaskEntity
    {
        public List<RelVerbTaskEntity> VerbTasks { get; set; }
        public List<AssignedVerbTaskEntity> AssignedVerbs { get; set; }
    }
}
