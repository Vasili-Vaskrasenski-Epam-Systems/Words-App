using Entities.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WordApp.Models
{
    public class UserModel: BaseModel
    {
        public string Name { get; set; }
        public string Password { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public UserType UserType { get; set; }
    }
}
