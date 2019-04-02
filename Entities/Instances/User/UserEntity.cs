using System.Collections.Generic;
using Entities.Enums;
using Entities.Instances.Base;
using Entities.Instances.Task.WordTask;

namespace Entities.Instances.User
{
    public class UserEntity: BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public UserType UserType { get; set; }
        public List<AssignedWordTaskEntity> AssignedTasks { get; set; }
        public virtual List<UserCredentialsEntity> Credentials { get; set; }
        public virtual UserProfileEntity UserProfile { get; set; }
    }
}
