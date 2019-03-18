using System;
using Entities.Instances.Base;
using Entities.Instances.Word;

namespace Entities.Instances.Task.WordTask
{
    public class RelTaskWordEntity: BaseEntity
    {
        public Guid TaskId { get; set; }
        public Guid WordId { get; set; }
        public bool IsTranslation { get; set; }
        public int Order { get; set; }
        public virtual WordTaskEntity WordTask { get; set; }
        public virtual WordEntity Word { get; set; }
    }
}
