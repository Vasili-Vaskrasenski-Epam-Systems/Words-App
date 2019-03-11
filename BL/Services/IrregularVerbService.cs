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

        public override IrregularVerbEntity UpdateEntity(IrregularVerbEntity entity)
        {
            var wordVerbs = base.DbContext.WordVerbs.Where(wv => wv.VerbId == entity.Id).ToList();
            base.DbContext.WordVerbs.RemoveRange(wordVerbs);

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
