using System;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class WordVerbEntity: BaseEntity
    {
        public Guid WordId { get; set; }
        public Guid VerbId { get; set; }
        public virtual WordEntity Word { get; set; }
        public virtual IrregularVerbEntity Verb { get; set; }
    }
}
