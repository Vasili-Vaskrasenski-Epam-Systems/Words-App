using DAL.Infrastructure;
using Entities.Instances.User;

namespace BL.Services.User
{
    public class UserCredentialsService: BaseEntityService<UserCredentialsEntity>
    {
        public UserCredentialsService(WordsDbContext context) : base(context)
        {
        }
    }
}
