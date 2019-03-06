using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DAL.Infrastructure;
using Entities.Instances;

namespace BL.Services
{
    public class WordService: BaseEntityService<WordEntity>
    {
        public WordService(WordsDbContext context): base(context)
        {
            
        }
        public override WordEntity CreateEntity(WordEntity entity)
        {
            base.DbContext.Words.Add(entity);
            base.DbContext.SaveChanges();
            return entity;
        }

        public override WordEntity DeleteEntity(WordEntity entity)
        {
            base.DbContext.Words.Remove(entity);
            base.DbContext.SaveChanges();
            return entity;
        }

        public override WordEntity UpdateEntity(WordEntity entity)
        {
            base.DbContext.Words.Update(entity);
            base.DbContext.SaveChanges();
            return entity;
        }

        public override WordEntity GetEntity(Guid id)
        {
            return base.DbContext.Words.FirstOrDefault(w => w.Id == id);
        }

        public override List<WordEntity> GetEntities()
        {
            return base.DbContext.Words.ToList();
        }

        public override List<WordEntity> GetEntities(Expression<Func<WordEntity, bool>> expression)
        {
            return base.DbContext.Words.Where(expression).ToList();
        }
    }
}
