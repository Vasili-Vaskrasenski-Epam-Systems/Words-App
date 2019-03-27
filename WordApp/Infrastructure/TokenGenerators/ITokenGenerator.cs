using System;
using Entities.Enums;
using Microsoft.IdentityModel.Tokens;

namespace WordApp.Infrastructure.TokenGenerators
{
    public interface ITokenGenerator
    {
        SecurityToken GenerateAccessToken(Guid userId, UserType userType);

        SecurityToken GenerateRefreshToken(Guid userId);

        string WriteToken(SecurityToken token);
    }
}
