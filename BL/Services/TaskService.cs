using DAL.Infrastructure;
using Entities.Instances;

namespace BL.Services
{
    public class TaskService: BaseEntityService<TaskEntity>
    {
        public TaskService(WordsDbContext context) : base(context)
        {
        }
    }
}
