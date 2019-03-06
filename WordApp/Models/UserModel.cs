using Entities.Enums;

namespace WordApp.Models
{
    public class UserModel: BaseModel
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public UserType UserType { get; set; }
    }
}
