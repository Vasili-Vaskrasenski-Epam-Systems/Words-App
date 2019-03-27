using System;
using Entities.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using WordApp.Models.User;

namespace WordApp.Models.Base
{
    public class BaseAssignableModel: BaseModel
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public TaskStatus TaskStatus { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime? CompleteDate { get; set; }
        public UserModel User { get; set; }
    }
}
