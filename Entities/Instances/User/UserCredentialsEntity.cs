using System;
using Entities.Enums;
using Entities.Instances.Base;

namespace Entities.Instances.User
{
    public class UserCredentialsEntity: BaseEntity
    {
        public UserCredentialsType CredentialsType { get; set; }
        public string Login { get; set; }
        public string Hash { get; set; }
        public Guid UserId { get; set; }
        public virtual UserEntity User { get; set; }
    }
}
