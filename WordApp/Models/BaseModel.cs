using System;

namespace WordApp.Models
{
    public abstract class BaseModel
    {
        public Guid Id { get; set; }
        public byte[] RowVersion { get; set; }
    }
}
