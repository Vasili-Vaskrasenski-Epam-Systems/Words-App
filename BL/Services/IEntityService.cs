using System;
using System.Collections.Generic;
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

        public abstract T CreateEntity(T entity);
        public abstract T DeleteEntity(T entity);
        public abstract T UpdateEntity(T entity);
        public abstract T GetEntity(Guid id);
        public abstract List<T> GetEntities();
        public abstract List<T> GetEntities(Expression<Func<T, bool>> expression);
    }
}
