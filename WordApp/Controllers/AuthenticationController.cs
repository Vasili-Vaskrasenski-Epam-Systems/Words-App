using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BL.Extensions.Collections;
using BL.Infrastructure.Encoders;
using BL.Services;
using DAL.Helpers;
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
        private readonly BaseEntityService<UserCredentialsEntity> _userCredentialsService;

        public AuthenticationController(IMapper mapper, BaseEntityService<UserEntity> service,
            ITokenGenerator tokenGenerator, BaseEntityService<UserCredentialsEntity> credentialsService) : base(mapper)
        {
            this._tokenGenerator = tokenGenerator;
            this._userService = service;
            this._userCredentialsService = credentialsService;
        }


        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody] UserRegistrationModel model)
        {
            var userToCreate = base.Mapper.Map<UserEntity>(model);
            var createdUser = this._userService.CreateEntity(userToCreate);
            return Ok(model);
        }


        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Login(string userName, string password)
        {
            var existingUser =
                this._userCredentialsService.GetQueryableEntity(e => (e.User.Name == userName || e.User.Email == userName) && SaltedHash.Verify(e.Hash, password) && e.CredentialsType == UserCredentialsType.Internal, "User");

            if (existingUser != null)
            {
                var accessToken = this._tokenGenerator.GenerateAccessToken(existingUser.Id, existingUser.User.UserType);

                var userModel = new UserLoginModel()
                {
                    Id = existingUser.UserId,
                    Name = existingUser.User.Name,
                    UserType = existingUser.User.UserType,
                    Token = this._tokenGenerator.WriteToken(accessToken),
                    TokenExpirationTime = accessToken.ValidTo,
                };
                return Ok(userModel);
            }

            return Ok("Wrong login or password");
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult LoginViaGoogle(string email, string password)
        {
            var existingUsers =
                this._userCredentialsService.GetQueryableEntities(e => e.User.Email == email, "User");

            UserCredentialsEntity existingUser = null;

            if (!existingUsers.ExistAndNotEmpty())
            {
                var userToCreate = new UserEntity()
                {
                    Email = email,
                    Name = email,
                    UserType = UserType.Pupil,
                    UserProfile = new UserProfileEntity(),
                    Credentials = new List<UserCredentialsEntity>()
                    {
                        new UserCredentialsEntity()
                        {
                            CredentialsType = UserCredentialsType.Google,
                            Login = email,
                            Hash = SaltedHash.ComputeHash(password),
                        }
                    },
                };

                var createdUser = this._userService.CreateEntity(userToCreate);

                existingUser = createdUser.Credentials.First();
            }
            else
            {
                existingUser = existingUsers.FirstOrDefault(u =>
                    SaltedHash.Verify(u.Hash, password) && u.CredentialsType == UserCredentialsType.Google);

                if (existingUser == null)
                {
                    existingUser = new UserCredentialsEntity()
                    {
                        CredentialsType = UserCredentialsType.Google,
                        Hash = SaltedHash.ComputeHash(password),
                        UserId = existingUsers.First().UserId,
                        Login = email,
                    };

                    this._userCredentialsService.CreateEntity(existingUser);
                }
            }

            var accessToken = this._tokenGenerator.GenerateAccessToken(existingUser.Id, existingUser.User.UserType);

            var userModel = new UserLoginModel()
            {
                Id = existingUser.UserId,
                Name = existingUser.User.Name,
                UserType = existingUser.User.UserType,
                Token = this._tokenGenerator.WriteToken(accessToken),
                TokenExpirationTime = accessToken.ValidTo,
            };
            return Ok(userModel);
        }
    }
}
