using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BL.Infrastructure.Encoders;
using Configuration;
using Entities.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace WordApp.Infrastructure.TokenGenerators
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly IJwtSigningEncodingKey _key;
        private readonly IConfiguration _appConfiguration;
        public TokenGenerator([FromServices]IJwtSigningEncodingKey key, IConfiguration config)
        {
            this._key = key;
            this._tokenHandler = new JwtSecurityTokenHandler();
            this._appConfiguration = config;
        }

        public SecurityToken GenerateAccessToken(Guid userId, UserType userType)
        {
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, userType.ToString()),
            };

            return this.GenerateToken(DateTime.UtcNow.AddMinutes(
                (Int32)this._appConfiguration.GetValue(typeof(Int32), Config.JwtConstants.AccessTokenExpirationMinutes)), claims);
        }

        public SecurityToken GenerateRefreshToken(Guid userId)
        {
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            return this.GenerateToken(DateTime.UtcNow.AddMinutes(
                (Int32)this._appConfiguration.GetValue(typeof(Int32), Config.JwtConstants.RefreshTokenExpirationMinutes)), claims);
        }

        public string WriteToken(SecurityToken token)
        {
            return this._tokenHandler.WriteToken(token);
        }

        private SecurityToken GenerateToken(DateTime expirationDate, params Claim[] claims)
        {
            return new JwtSecurityToken(
                issuer: (string)this._appConfiguration.GetValue(typeof(string), Config.JwtConstants.ValidIssuerName),
                audience: (string)this._appConfiguration.GetValue(typeof(string), Config.JwtConstants.ValidAudienceName),
                claims: claims,
                expires: expirationDate,
                signingCredentials: new SigningCredentials(
                    this._key.GetKey(),
                    this._key.SigningAlgorithm)
            );
        }
    }
}
