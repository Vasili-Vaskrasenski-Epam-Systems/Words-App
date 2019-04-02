using System;
using Entities.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using WordApp.Models.Base;

namespace WordApp.Models.User
{
    public class UserLoginModel: BaseModel
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public DateTime? TokenExpirationTime { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public UserType UserType { get; set; }
        public string Name { get; set; }
    }
}
