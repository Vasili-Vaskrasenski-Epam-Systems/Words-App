using System.Collections.Generic;

namespace DAL.Entities
{
    public class IrregularVerbEntity: BaseEntity
    {
        public string CommonWord { get; set; }
        public virtual List<WordVerbEntity> WordVerbs { get; set; }
    }
}
