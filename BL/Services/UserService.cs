using DAL.Infrastructure;
using Entities.Instances;

namespace BL.Services
{
    public class UserService:BaseEntityService<UserEntity>
    {
        public UserService(WordsDbContext context) : base(context)
        {
        }
    }
}
