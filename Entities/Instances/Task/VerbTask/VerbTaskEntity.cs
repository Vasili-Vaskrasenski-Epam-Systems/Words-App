using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances.Task.VerbTask
{
    public class VerbTaskEntity : BaseTaskEntity
    {
        public List<RelVerbTaskEntity> TaskVerbs { get; set; }
        public List<AssignedVerbTaskEntity> AssignedVerbs { get; set; }
    }
}
