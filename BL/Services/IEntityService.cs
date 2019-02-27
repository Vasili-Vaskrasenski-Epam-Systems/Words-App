using System;
using System.Collections.Generic;
using DAL.Entities;

namespace BL.Services
{
    public interface IEntityService<T> where T: BaseEntity
    {
        T CreateEntity(T entity);
        T DeleteEntity(T entity);
        T UpdateEntity(T entity);
        T GetEntity(Guid id);
        List<T> GetEntities();
    }
}
