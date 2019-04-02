using System;
using Microsoft.AspNetCore.Identity;

namespace Entities.Instances.User
{
    public class ApplicationUserEntity: IdentityUser
    {
        public virtual UserEntity User { get; set; }
        public Guid UserId { get; set; }
    }
}
