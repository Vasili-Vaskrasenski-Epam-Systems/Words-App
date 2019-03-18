using DAL.Infrastructure;
using Entities.Instances.Task.VerbTask;

namespace BL.Services.Task.VerbTaskServices
{
    public class AssignVerbTaskService: BaseEntityService<AssignedVerbTaskEntity>
    {
        public AssignVerbTaskService(WordsDbContext context) : base(context)
        {
        }
    }
}
