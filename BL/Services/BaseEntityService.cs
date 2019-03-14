using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DAL.Infrastructure;
using Entities.Instances.Base;
using Microsoft.EntityFrameworkCore;

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

        public virtual List<T> CreateEntities(List<T> entities)
        {
            var dbSet = this.DbContext.Set<T>();
            dbSet.AddRange(entities);
            this.DbContext.SaveChanges();
            return entities;
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

        public virtual T GetQueryableEntity(Guid entityId, params string[] properties)
        {
            var query = this.DbContext.Set<T>().AsQueryable();

            foreach (string include in properties)
                query = query.Include(include);

            return query.FirstOrDefault(e => e.Id == entityId);
        }

        public virtual List<T> GetQueryableEntities(Expression<Func<T, bool>> expression, params string[] properties)
        {
            var query = this.DbContext.Set<T>().AsQueryable().Where(expression);

            foreach (string include in properties)
                query = query.Include(include);

            return query.ToList();
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
