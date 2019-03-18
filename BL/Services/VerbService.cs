using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DAL.Infrastructure;
using Entities.Instances.Verb;
using Microsoft.EntityFrameworkCore;

namespace BL.Services
{
    public class VerbService : BaseEntityService<VerbEntity>
    {
        public VerbService(WordsDbContext context) : base(context)
        {
        }

        public override VerbEntity UpdateEntity(VerbEntity entity)
        {
            var wordVerbs = base.DbContext.RelWordVerbs.Where(wv => wv.VerbId == entity.Id).ToList();
            base.DbContext.RelWordVerbs.RemoveRange(wordVerbs);

            base.DbContext.Verbs.Update(entity);
            base.DbContext.SaveChanges();

            return GetEntity(entity.Id);
        }

        public override VerbEntity GetEntity(Guid id)
        {
            return base.DbContext.Verbs
                .Include(iv => iv.WordVerbs)
                .ThenInclude(w => w.Word).FirstOrDefault(e => e.Id == id);
        }

        public override List<VerbEntity> GetEntities()
        {
            return base.DbContext.Verbs
                .Include(iv => iv.WordVerbs)
                .ThenInclude(w => w.Word).ToList();
        }

        public override List<VerbEntity> GetEntities(Expression<Func<VerbEntity, bool>> expression)
        {
            throw new NotImplementedException();
        }
    }
}
