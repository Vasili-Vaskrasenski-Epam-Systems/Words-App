using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DAL.Infrastructure;
using Entities.Instances.Base;

namespace BL.Services
{
    public abstract class BaseEntityService<T> where T: BaseEntity
    {
        protected WordsDbContext DbContext;

        protected BaseEntityService(WordsDbContext context)
        {
            this.DbContext = context;
        }

        public virtual T CreateEntity(T entity)
        {
            var dbSet = this.DbContext.Set<T>();
            dbSet.Add(entity);
            this.DbContext.SaveChanges();
            return this.GetEntity(entity.Id);
        }

        public virtual T DeleteEntity(T entity)
        {
            var dbSet = this.DbContext.Set<T>();
            dbSet.Remove(entity);
            this.DbContext.SaveChanges();
            return entity;
        }

        public virtual T UpdateEntity(T entity)
        {
            var dbSet = this.DbContext.Set<T>();
            dbSet.Update(entity);
            this.DbContext.SaveChanges();
            return this.GetEntity(entity.Id);
        }

        public virtual T GetEntity(Guid id)
        {
            var dbSet = this.DbContext.Set<T>();
            return dbSet.FirstOrDefault(e => e.Id == id);
        }

        public virtual List<T> GetEntities()
        {
            return this.DbContext.Set<T>().ToList();
        }

        public virtual List<T> GetEntities(Expression<Func<T, bool>> expression)
        {
            return this.DbContext.Set<T>().Where(expression).ToList();
        }
    }
}
