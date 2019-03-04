using System;

namespace DAL.Entities
{
    public abstract class BaseEntity: BaseVersionEntity
    {
        public Guid Id { get; set; }
    }
}
