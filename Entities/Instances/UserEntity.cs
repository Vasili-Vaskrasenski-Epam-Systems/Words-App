using System.Collections.Generic;
using Entities.Enums;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class UserEntity: BaseEntity
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public UserType UserType { get; set; }
        public List<AssignedTaskEntity> AssignedTasks { get; set; }
    }
}
