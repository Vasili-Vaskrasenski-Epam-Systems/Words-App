using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WordApp.Models.Base;

namespace WordApp.Models.TaskModels.VerbTaskModels
{
    public class VerbAnswerModel: BaseModel
    {
        public string FirstForm { get; set; }
        public string SecondForm { get; set; }
        public string ThirdForm { get; set; }
    }
}
