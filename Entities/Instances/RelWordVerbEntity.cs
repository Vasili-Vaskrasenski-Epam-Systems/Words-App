using System;
using Entities.Instances.Base;
using Entities.Instances.Verb;
using Entities.Instances.Word;

namespace Entities.Instances
{
    public class RelWordVerbEntity: BaseEntity
    {
        public Guid WordId { get; set; }
        public Guid VerbId { get; set; }
        public virtual WordEntity Word { get; set; }
        public virtual VerbEntity Verb { get; set; }
    }
}
