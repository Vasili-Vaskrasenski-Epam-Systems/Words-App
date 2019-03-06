using System;
using System.Collections.Generic;
using System.Text;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class TaskWordEntity: BaseEntity
    {
        public Guid TaskId { get; set; }
        public Guid WordId { get; set; }
        public bool IsTranslation { get; set; }
        public int Order { get; set; }

        public virtual TaskEntity Task { get; set; }
        public virtual WordEntity Word { get; set; }
    }
}
