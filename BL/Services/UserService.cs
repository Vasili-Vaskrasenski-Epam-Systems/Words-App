using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using DAL.Infrastructure;
using Entities.Instances;

namespace BL.Services
{
    public class UserService:BaseEntityService<UserEntity>
    {
        public UserService(WordsDbContext context) : base(context)
        {
        }
        public override UserEntity CreateEntity(UserEntity entity)
        {
            throw new NotImplementedException();
        }

        public override UserEntity DeleteEntity(UserEntity entity)
        {
            throw new NotImplementedException();
        }

        public override UserEntity UpdateEntity(UserEntity entity)
        {
            throw new NotImplementedException();
        }

        public override UserEntity GetEntity(Guid id)
        {
            throw new NotImplementedException();
        }

        public override List<UserEntity> GetEntities()
        {
            return base.DbContext.Users.ToList();
        }

        public override List<UserEntity> GetEntities(Expression<Func<UserEntity, bool>> expression)
        {
            return base.DbContext.Users.Where(expression).ToList();
        }
    }
}
