using System;
using Entities.Instances.Base;

namespace Entities.Instances.User
{
    public class UserProfileEntity: BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public virtual UserEntity User { get; set; }
    }
}
