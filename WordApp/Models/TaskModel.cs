using Entities.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WordApp.Models
{
    public class TaskModel : BaseModel
    {
        public string Name { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public TaskType TaskType { get; set; }
    }
}
