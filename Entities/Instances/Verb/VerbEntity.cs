using System.Collections.Generic;
using Entities.Instances.Base;
using Entities.Instances.Task.VerbTask;

namespace Entities.Instances.Verb
{
    public class VerbEntity: BaseEntity
    {
        public string CommonWord { get; set; }
        public virtual List<RelWordVerbEntity> WordVerbs { get; set; }
        public List<RelVerbTaskEntity> VerbTasks { get; set; }
    }
}
