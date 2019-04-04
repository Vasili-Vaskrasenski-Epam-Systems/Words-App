using System;
using WordApp.Models.Base;

namespace WordApp.Models.User
{
    public class UserProfileModel: BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirthDate { get; set; }
    }
}
