using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DAL.Infrastructure;
using Entities.Instances.Task.SentenceTask;
using Microsoft.EntityFrameworkCore;

namespace BL.Services.Task.SentenceTaskServices
{
    public class AssignSentenceTaskService: BaseEntityService<AssignedSentenceTaskEntity>
    {
        public AssignSentenceTaskService(WordsDbContext context) : base(context)
        {
        }

        public override List<AssignedSentenceTaskEntity> GetEntities()
        {
            return base.DbContext.AssignedSentenceTasks
                .Include(e => e.User)
                .Include(e => e.SentenceTask).ToList();
        }

        public override List<AssignedSentenceTaskEntity> GetEntities(Expression<Func<AssignedSentenceTaskEntity, bool>> expression)
        {
            return base.DbContext.AssignedSentenceTasks
                .Where(expression)
                .Include(e => e.User)
                .Include(e => e.SentenceTask).ToList();
        }
    }
}
