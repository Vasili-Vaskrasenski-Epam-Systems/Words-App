using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class IrregularVerbEntity: BaseEntity
    {
        public string CommonWord { get; set; }
        public virtual List<WordVerbEntity> WordVerbs { get; set; }
    }
}
