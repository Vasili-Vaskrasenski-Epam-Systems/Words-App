using AutoMapper;
using BL.Services;
using Entities.Enums;
using Entities.Instances.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WordApp.Infrastructure.TokenGenerators;
using WordApp.Models.User;

namespace WordApp.Controllers
{
    public class AuthenticationController : BaseController
    {
        private readonly ITokenGenerator _tokenGenerator;
        private readonly BaseEntityService<UserEntity> _userService;
        public AuthenticationController(IMapper mapper, BaseEntityService<UserEntity> service, ITokenGenerator tokenGenerator, IConfiguration configuration) : base(mapper)
        {
            this._tokenGenerator = tokenGenerator;
            this._userService = service;
        }


        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody] UserModel model)
        {
            model.UserType = UserType.Pupil;
            var userToCreate = base.Mapper.Map<UserEntity>(model);
            var createdUser = this._userService.CreateEntity(userToCreate);
            return Ok(base.Mapper.Map<UserModel>(createdUser));
        }


        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Login(string userName, string password)
        {
            var existingUser = this._userService.GetQueryableEntity(e => e.Name == userName && e.Password == password, "Tokens");

            if (existingUser != null)
            {
                var accessToken = this._tokenGenerator.GenerateAccessToken(existingUser.Id, existingUser.UserType);
                var refreshToken = this._tokenGenerator.GenerateRefreshToken(existingUser.Id);

                var userTokenEntity = new UserTokenEntity()
                {
                    AccessToken = this._tokenGenerator.WriteToken(accessToken),
                    RefreshToken = this._tokenGenerator.WriteToken(refreshToken),
                    IsActive = true
                };

                existingUser.Tokens.Add(userTokenEntity);
                
                var updatedEntity = this._userService.UpdateEntity(existingUser);

                var userModel = base.Mapper.Map<UserModel>(updatedEntity);
                userModel.Token = new UserTokenModel()
                {
                    RefreshToken = userTokenEntity.RefreshToken,
                    RefreshTokenExpirationDate = refreshToken.ValidTo,
                    AccessToken = userTokenEntity.AccessToken,
                    AccessTokenExpirationDate = accessToken.ValidTo,
                };

                return Ok(userModel);
            }

            return Ok("Wrong login or password");
        }
    }
}
