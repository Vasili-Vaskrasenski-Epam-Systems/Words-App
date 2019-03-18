using System;
using System.Linq;
using DAL.Infrastructure;
using Entities.Instances.Task.VerbTask;
using Microsoft.EntityFrameworkCore;

namespace BL.Services.Task.VerbTaskServices
{
    public class VerbTaskService: BaseEntityService<VerbTaskEntity>
    {
        public VerbTaskService(WordsDbContext context) : base(context)
        {
        }

        public override VerbTaskEntity UpdateEntity(VerbTaskEntity entity)
        {
            var taskWordsToRemove = base.DbContext.RelVerbTasks.Where(wt => wt.TaskVerbId == entity.Id);
            base.DbContext.RelVerbTasks.RemoveRange(taskWordsToRemove);
            base.DbContext.VerbTasks.Update(entity);
            base.DbContext.SaveChanges();
            return this.GetEntity(entity.Id);
        }

        public override VerbTaskEntity GetEntity(Guid id)
        {
            return DbContext.VerbTasks
                .Include(t => t.TaskVerbs).ThenInclude(tw => tw.Verb)
                .FirstOrDefault(wt => wt.Id == id);
        }
    }
}
