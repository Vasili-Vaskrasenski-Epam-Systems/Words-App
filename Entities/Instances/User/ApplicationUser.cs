using System;
using Microsoft.AspNetCore.Identity;

namespace Entities.Instances.User
{
    public class ApplicationUser: IdentityUser
    {
        public Guid UserId { get; set; }
        public UserEntity User { get; set; }
    }
}
