using System.Collections.Generic;
using Entities.Instances.Base;
using Entities.Instances.Task;
using Entities.Instances.Task.WordTask;

namespace Entities.Instances.Word
{
    public class WordEntity: BaseEntity
    {
        public string Word { get; set; }
        public string Transcription { get; set; }
        public string Translation { get; set; }
        public virtual List<RelWordVerbEntity> WordVerbEntities { get; set; }
        public virtual List<RelTaskWordEntity> TaskWords { get; set; }
        public virtual List<RelAnswerWordEntity> AnsweredWord { get; set; }
    }
}
