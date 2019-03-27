using Entities.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using WordApp.Models.Base;

namespace WordApp.Models.User
{
    public class UserModel: BaseModel
    {
        public string Name { get; set; }
        public string Password { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public UserType UserType { get; set; }
        public UserTokenModel Token { get; set; }
    }
}
