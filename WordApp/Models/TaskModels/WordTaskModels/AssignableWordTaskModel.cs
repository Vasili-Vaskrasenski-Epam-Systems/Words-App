using System;
using System.Collections.Generic;
using Entities.Enums;
using Entities.Instances;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.WordTaskModels
{
    public class AssignableWordTaskModel: BaseModel
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public TaskStatus TaskStatus { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime? CompleteDate { get; set; }
        public UserModel User { get; set; }
        public WordTaskModel WordTask { get; set; }
        public List<AnsweredWordModel> AnsweredWords { get; set; }
    }
}
