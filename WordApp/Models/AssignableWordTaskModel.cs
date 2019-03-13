using System;
using Entities.Enums;
using Entities.Instances;
using WordApp.Models.Base;

namespace WordApp.Models
{
    public class AssignableWordTaskModel: BaseModel
    {
        public TaskStatus TaskStatus { get; set; }
        public DateTime Deadline { get; set; }
        public virtual UserEntity User { get; set; }
        public virtual WordTaskEntity WordTask { get; set; }
    }
}
