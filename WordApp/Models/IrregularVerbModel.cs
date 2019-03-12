﻿using System.Collections.Generic;
using WordApp.Models.Base;

namespace WordApp.Models
{
    public class IrregularVerbModel: BaseModel
    {
        public string CommonWord { get; set; }
        public List<WordModel> Words { get; set; }
    }
}
