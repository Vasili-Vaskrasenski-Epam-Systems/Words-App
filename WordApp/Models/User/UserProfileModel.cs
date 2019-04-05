using System;
using Entities.Enums;
using WordApp.Models.Base;

namespace WordApp.Models.User
{
    public class UserProfileModel: BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public UserType UserType { get; set; }
    }
}
