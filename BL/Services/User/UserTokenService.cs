using DAL.Infrastructure;
using Entities.Instances.User;

namespace BL.Services.User
{
    public class UserTokenService: BaseEntityService<UserTokenEntity>
    {
        public UserTokenService(WordsDbContext context) : base(context)
        {
        }
    }
}
