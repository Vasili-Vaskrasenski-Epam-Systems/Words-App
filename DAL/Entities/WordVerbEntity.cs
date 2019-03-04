using System;

namespace DAL.Entities
{
    public class WordVerbEntity: BaseVersionEntity
    {
        public Guid WordId { get; set; }
        public Guid VerbId { get; set; }
        public virtual WordEntity Word { get; set; }
        public virtual IrregularVerbEntity Verb { get; set; }
    }
}
