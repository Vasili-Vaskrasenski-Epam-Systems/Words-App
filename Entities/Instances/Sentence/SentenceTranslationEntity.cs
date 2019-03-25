using System;
using Entities.Instances.Base;

namespace Entities.Instances.Sentence
{
    public class SentenceTranslationEntity : BaseEntity
    {
        public string Translation { get; set; }
        public Guid SentenceId { get; set; }
        public virtual SentenceEntity Sentence { get; set; }
    }
}
