using System;

namespace Entities.Instances.Base
{
    public abstract class BaseEntity: BaseVersionEntity
    {
        public Guid Id { get; set; }
    }
}
