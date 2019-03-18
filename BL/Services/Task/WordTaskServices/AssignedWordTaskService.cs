using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DAL.Infrastructure;
using Entities.Instances.Task.WordTask;
using Microsoft.EntityFrameworkCore;

namespace BL.Services.Task.WordTaskServices
{
    public class AssignedWordTaskService: BaseEntityService<AssignedWordTaskEntity>
    {
        public AssignedWordTaskService(WordsDbContext context) : base(context)
        {
        }

        public override List<AssignedWordTaskEntity> GetEntities()
        {
            return base.DbContext.AssignedWordTasks
                .Include(e => e.User)
                .Include(e => e.WordTask).ToList();
        }

        public override List<AssignedWordTaskEntity> GetEntities(Expression<Func<AssignedWordTaskEntity, bool>> expression)
        {
            return base.DbContext.AssignedWordTasks
                .Where(expression)
                .Include(e => e.User)
                .Include(e => e.WordTask).ToList();
        }
    }
}
