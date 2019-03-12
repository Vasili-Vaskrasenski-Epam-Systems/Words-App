using System;
using System.Collections.Generic;
using System.Linq;
using DAL.Infrastructure;
using Entities.Instances;
using Microsoft.EntityFrameworkCore;

namespace BL.Services
{
    public class WordTaskService : BaseEntityService<WordTaskEntity>
    {
        public WordTaskService(WordsDbContext context) : base(context)
        {
        }

        public override List<WordTaskEntity> GetEntities()
        {
            return base.DbContext.WordTasks
                .Include(t => t.TaskWords).ThenInclude(tw => tw.Word)
                .Include(t => t.AssignedWordTasks).ThenInclude(awt => awt.User).ToList();
        }

        public override WordTaskEntity UpdateEntity(WordTaskEntity entity)
        {
            var taskWordsToRemove = base.DbContext.TaskWords.Where(wt => wt.TaskId == entity.Id);
            base.DbContext.TaskWords.RemoveRange(taskWordsToRemove);
            base.DbContext.WordTasks.Update(entity);
            base.DbContext.SaveChanges();
            return this.GetEntity(entity.Id);
        }

        public override WordTaskEntity GetEntity(Guid id)
        {
            return DbContext.WordTasks
                .Include(t => t.TaskWords).ThenInclude(tw => tw.Word)
                .Include(t => t.AssignedWordTasks).ThenInclude(awt => awt.User)
                    .FirstOrDefault(wt => wt.Id == id);
        }
    }
}
