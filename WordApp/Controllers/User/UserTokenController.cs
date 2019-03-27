using System;
using System.Linq;
using AutoMapper;
using BL.Services;
using Entities.Instances.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordApp.Infrastructure.TokenGenerators;
using WordApp.Models.User;

namespace WordApp.Controllers.User
{
    public class UserTokenController : BaseController
    {
        private readonly BaseEntityService<UserTokenEntity> _userTokenService;
        private readonly BaseEntityService<UserEntity> _userService;
        private readonly ITokenGenerator _tokenGenerator;

        public UserTokenController(IMapper mapper,
            BaseEntityService<UserTokenEntity> userTokenService,
            BaseEntityService<UserEntity> userService,
            ITokenGenerator tokenGenerator) : base(mapper)
        {
            this._userTokenService = userTokenService;
            this._userService = userService;
            this._tokenGenerator = tokenGenerator;
        }

        [HttpPost("[action]")]
        [Authorize]
        public IActionResult RefreshToken(Guid userId, string refreshToken)
        {
            var existingUser = this._userService.GetQueryableEntity(userId, new[] { "Tokens" });

            if (existingUser == null)
            {
                return BadRequest("No user found");
            }

            var existingToken = existingUser.Tokens.FirstOrDefault(t => t.RefreshToken == refreshToken);
            if (existingToken == null)
            {
                return BadRequest("Unknown refresh token");
            }
            else if (!existingToken.IsActive)
            {
                return BadRequest("Token has expired");
            }
            else
            {
                existingToken.IsActive = false;
                this._userTokenService.UpdateEntity(existingToken);

                var newAccessToken = this._tokenGenerator.GenerateAccessToken(existingUser.Id, existingUser.UserType);
                var newRefreshToken = this._tokenGenerator.GenerateRefreshToken(existingUser.Id);

                var userTokenEntity = new UserTokenEntity()
                {
                    AccessToken = this._tokenGenerator.WriteToken(newAccessToken),
                    RefreshToken = this._tokenGenerator.WriteToken(newRefreshToken),
                    IsActive = true,
                    UserId = existingUser.Id,
                };

                this._userTokenService.CreateEntity(userTokenEntity);

                return Ok(new UserTokenModel()
                {
                    AccessToken = userTokenEntity.AccessToken,
                    AccessTokenExpirationDate = newAccessToken.ValidTo,
                    RefreshToken = userTokenEntity.RefreshToken,
                    RefreshTokenExpirationDate = newRefreshToken.ValidTo,
                });
            }
        }
    }
}
