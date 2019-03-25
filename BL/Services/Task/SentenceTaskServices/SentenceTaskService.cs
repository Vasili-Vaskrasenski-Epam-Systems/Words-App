using System;
using System.Collections.Generic;
using System.Linq;
using DAL.Infrastructure;
using Entities.Instances.Task.SentenceTask;
using Microsoft.EntityFrameworkCore;

namespace BL.Services.Task.SentenceTaskServices
{
    public class SentenceTaskService: BaseEntityService<SentenceTaskEntity>
    {
        public SentenceTaskService(WordsDbContext context) : base(context)
        {
        }
        public override List<SentenceTaskEntity> GetEntities()
        {
            return base.DbContext.SentenceTasks
                .Include(t => t.SentenceTasks).ThenInclude(tw => tw.Sentence)
                .Include(t => t.AssignedSentenceTasks).ThenInclude(awt => awt.User).ToList();
        }

        public override SentenceTaskEntity UpdateEntity(SentenceTaskEntity entity)
        {
            var taskWordsToRemove = base.DbContext.RelSentenceTasks.Where(wt => wt.TaskId == entity.Id);
            base.DbContext.RelSentenceTasks.RemoveRange(taskWordsToRemove);
            base.DbContext.SentenceTasks.Update(entity);
            base.DbContext.SaveChanges();
            return this.GetEntity(entity.Id);
        }

        public override SentenceTaskEntity GetEntity(Guid id)
        {
            return DbContext.SentenceTasks
                .Include(t => t.SentenceTasks).ThenInclude(tw => tw.Sentence)
                .Include(t => t.AssignedSentenceTasks).ThenInclude(awt => awt.User)
                .FirstOrDefault(wt => wt.Id == id);
        }
    }
}
