using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class WordEntity: BaseEntity
    {
        public string Word { get; set; }
        public string Transcription { get; set; }
        public string Translation { get; set; }
        public virtual List<WordVerbEntity> WordVerbEntities { get; set; }
    }
}
