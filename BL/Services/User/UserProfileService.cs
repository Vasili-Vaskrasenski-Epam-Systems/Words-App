using DAL.Infrastructure;
using Entities.Instances.User;

namespace BL.Services.User
{
    public class UserProfileService : BaseEntityService<UserProfileEntity>
    {
        public UserProfileService(WordsDbContext context) : base(context)
        {
        }
    }
}
