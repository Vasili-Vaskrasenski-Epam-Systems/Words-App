using DAL.Infrastructure;
using Entities.Instances.User;

namespace BL.Services.User
{
    public class UserService:BaseEntityService<UserEntity>
    {
        public UserService(WordsDbContext context) : base(context)
        {
        }
    }
}
