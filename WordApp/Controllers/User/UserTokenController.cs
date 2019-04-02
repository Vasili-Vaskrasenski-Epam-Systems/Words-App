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
        private readonly BaseEntityService<UserCredentialsEntity> _userTokenService;
        private readonly BaseEntityService<UserEntity> _userService;
        private readonly ITokenGenerator _tokenGenerator;

        public UserTokenController(IMapper mapper,
            BaseEntityService<UserCredentialsEntity> userTokenService,
            BaseEntityService<UserEntity> userService,
            ITokenGenerator tokenGenerator) : base(mapper)
        {
            this._userTokenService = userTokenService;
            this._userService = userService;
            this._tokenGenerator = tokenGenerator;
        }

        [HttpPost("[action]")]
        [Authorize]
        public IActionResult RefreshToken(Guid userId)
        {
            //TODO
            var existingUser = this._userService.GetEntity(userId);

            if (existingUser == null)
            {
                return BadRequest("No user found");
            }

            var accessToken = this._tokenGenerator.GenerateAccessToken(existingUser.Id, existingUser.UserType);

            var userTokenModel = new UserTokenModel()
            {
                AccessToken = this._tokenGenerator.WriteToken(accessToken),
                AccessTokenExpirationDate = accessToken.ValidTo,
            };

            return Ok(userTokenModel);
        }
    }
}
