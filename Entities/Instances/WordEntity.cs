using System.Collections.Generic;
using Entities.Instances.Base;

namespace Entities.Instances
{
    public class WordEntity: BaseEntity
    {
        public string Word { get; set; }
        public string Transcription { get; set; }
        public string Translation { get; set; }
        public virtual List<WordVerbEntity> WordVerbEntities { get; set; }
        public virtual List<TaskWordEntity> TaskWords { get; set; }
        public virtual List<AnsweredWordEntity> AnsweredWord { get; set; }
    }
}
