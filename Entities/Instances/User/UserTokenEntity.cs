using System;
using System.Collections.Generic;
using System.Text;
using Entities.Instances.Base;

namespace Entities.Instances.User
{
    public class UserTokenEntity: BaseEntity
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public bool IsActive { get; set; }
        public Guid UserId { get; set; }
        public virtual UserEntity User { get; set; }
    }
}
