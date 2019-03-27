using System;
using WordApp.Models.Base;

namespace WordApp.Models.User
{
    public class UserTokenModel: BaseModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public DateTime AccessTokenExpirationDate { get; set; }
        public DateTime RefreshTokenExpirationDate { get; set; }
    }
}
