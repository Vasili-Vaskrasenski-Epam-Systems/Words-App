using System;
using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models
{
    public class AssignableWordTaskModel: BaseModel
    {
        public WordTaskModel Task { get; set; }
        public List<UserModel> Users { get; set; }
        public DateTime Deadline { get; set; }
    }
}
