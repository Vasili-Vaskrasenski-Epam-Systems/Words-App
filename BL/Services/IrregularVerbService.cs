using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DAL.Infrastructure;
using Entities.Instances;
using Microsoft.EntityFrameworkCore;

namespace BL.Services
{
    public class IrregularVerbService : BaseEntityService<IrregularVerbEntity>
    {
        public IrregularVerbService(WordsDbContext context) : base(context)
        {
        }
        public override IrregularVerbEntity CreateEntity(IrregularVerbEntity entity)
        {
            base.DbContext.IrregularVerbs.Add(entity);
            base.DbContext.SaveChanges();
            return this.GetEntity(entity.Id);
        }

        public override IrregularVerbEntity DeleteEntity(IrregularVerbEntity entity)
        {
            base.DbContext.IrregularVerbs.Remove(entity);
            base.DbContext.SaveChanges();
            return entity;
        }

        public override IrregularVerbEntity UpdateEntity(IrregularVerbEntity entity)
        {
            var wordVerbs = base.DbContext.WordVerbs.Where(wv => wv.VerbId == entity.Id).ToList();
            base.DbContext.WordVerbs.RemoveRange(wordVerbs);

            //var e = this.GetEntity(entity.Id);
            //e.WordVerbs = new List<WordVerbEntity>(entity.WordVerbs);
            //e.CommonWord = entity.CommonWord;

            base.DbContext.IrregularVerbs.Update(entity);
            base.DbContext.SaveChanges();

            return GetEntity(entity.Id);
        }

        public override IrregularVerbEntity GetEntity(Guid id)
        {
            return base.DbContext.IrregularVerbs
                .Include(iv => iv.WordVerbs)
                .ThenInclude(w => w.Word).FirstOrDefault(e => e.Id == id);
        }

        public override List<IrregularVerbEntity> GetEntities()
        {
            return base.DbContext.IrregularVerbs
                .Include(iv => iv.WordVerbs)
                .ThenInclude(w => w.Word).ToList();
        }

        public override List<IrregularVerbEntity> GetEntities(Expression<Func<IrregularVerbEntity, bool>> expression)
        {
            throw new NotImplementedException();
        }
    }
}
