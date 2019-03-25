using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BL.Infrastructure.Encoders;
using Configuration;
using Entities.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace WordApp.Infrastructure
{
    public class TokenGenerator
    {
        private readonly IJwtSigningEncodingKey _key;
        public TokenGenerator([FromServices]IJwtSigningEncodingKey key)
        {
            this._key = key;
        }
        public string GenerateToken(Guid userId, UserType userType)
        {
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Role, userType.ToString()), 
            };

            var token = new JwtSecurityToken(
                issuer: Config.JwtConstants.ValidIssuerName,
                audience: Config.JwtConstants.ValidAudienceName,
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: new SigningCredentials(
                    this._key.GetKey(),
                    this._key.SigningAlgorithm)
            );

            string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }
    }
}
