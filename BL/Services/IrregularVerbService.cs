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
            return this.GetEntity(entity.Id);
        }

        public IrregularVerbEntity DeleteEntity(IrregularVerbEntity entity)
        {
            this._context.IrregularVerbs.Remove(entity);
            this._context.SaveChanges();
            return entity;
        }

        public IrregularVerbEntity UpdateEntity(IrregularVerbEntity entity)
        {
            var wordVerbs = this._context.WordVerbs.Where(wv => wv.VerbId == entity.Id).ToList();
            this._context.WordVerbs.RemoveRange(wordVerbs);

            //var e = this.GetEntity(entity.Id);
            //e.WordVerbs = new List<WordVerbEntity>(entity.WordVerbs);
            //e.CommonWord = entity.CommonWord;
            
            this._context.IrregularVerbs.Update(entity);
            this._context.SaveChanges();

            return GetEntity(entity.Id);
        }

        public IrregularVerbEntity GetEntity(Guid id)
        {           
            return this._context.IrregularVerbs
                .Include(iv => iv.WordVerbs)
                .ThenInclude(w => w.Word).FirstOrDefault(e => e.Id == id);
        }

        public List<IrregularVerbEntity> GetEntities()
        {
            return this._context.IrregularVerbs
                .Include(iv => iv.WordVerbs)
                .ThenInclude(w => w.Word).ToList();
        }
    }
}
