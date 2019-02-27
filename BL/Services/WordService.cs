using System;
using System.Collections.Generic;
using System.Linq;
using DAL.Entities;
using DAL.Infrastructure;

namespace BL.Services
{
    public class WordService: IEntityService<WordEntity>
    {
        private readonly WordsDbContext _wordContext;

        public WordService(WordsDbContext context)
        {
            this._wordContext = context;
        }
        public WordEntity CreateEntity(WordEntity entity)
        {
            this._wordContext.Words.Add(entity);
            this._wordContext.SaveChanges();
            return entity;
        }

        public WordEntity DeleteEntity(WordEntity entity)
        {
            this._wordContext.Words.Remove(entity);
            this._wordContext.SaveChanges();
            return entity;
        }

        public WordEntity UpdateEntity(WordEntity entity)
        {
            this._wordContext.Words.Update(entity);
            this._wordContext.SaveChanges();
            return entity;
        }

        public WordEntity GetEntity(Guid id)
        {
            return this._wordContext.Words.FirstOrDefault(w => w.Id == id);
        }

        public List<WordEntity> GetEntities()
        {
            return this._wordContext.Words.ToList();
        }
    }
}
