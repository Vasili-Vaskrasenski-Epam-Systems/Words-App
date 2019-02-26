using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Entities;
using DAL.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace BL.Services
{
    public class IrregularVerbService: IEntityService<IrregularVerbEntity>
    {
        private readonly WordsDbContext _context;

        public IrregularVerbService(WordsDbContext context)
        {
            this._context = context;
        }
        public IrregularVerbEntity CreateEntity(IrregularVerbEntity entity)
        {
            this._context.IrregularVerbs.Add(entity);
            this._context.SaveChanges();
            return entity;
        }

        public IrregularVerbEntity DeleteEntity(IrregularVerbEntity entity)
        {
            this._context.IrregularVerbs.Remove(entity);
            this._context.SaveChanges();
            return entity;
        }

        public IrregularVerbEntity UpdateEntity(IrregularVerbEntity entity)
        {
            //this._context.IrregularVerbs.Update(entity);
            //this._context.
            throw new NotImplementedException();
        }

        public IrregularVerbEntity GetEntity(Guid Id)
        {
            throw new NotImplementedException();
        }

        public List<IrregularVerbEntity> GetEntities()
        {
            return this._context.IrregularVerbs
                .Include(iv => iv.WordVerbs)
                .ThenInclude(w => w.Word).ToList();
        }
    }
}
