using DAL.Infrastructure;
using Entities.Instances.Sentence;

namespace BL.Services
{
    public class SentenceService: BaseEntityService<SentenceEntity>
    {
        public SentenceService(WordsDbContext context) : base(context)
        {
        }
    }
}
