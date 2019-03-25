using AutoMapper;
using BL.Infrastructure.Encoders;
using BL.Services;
using Entities.Enums;
using Entities.Instances;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordApp.Infrastructure;
using WordApp.Models;

namespace WordApp.Controllers
{
    public class AuthenticationController: BaseController
    {
        private readonly IJwtSigningEncodingKey _encodingKey;
        private readonly BaseEntityService<UserEntity> _userService;
        public AuthenticationController(IMapper mapper, BaseEntityService<UserEntity> service, [FromServices] IJwtSigningEncodingKey singingEncodingKey) : base(mapper)
        {
            this._encodingKey = singingEncodingKey;
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
            var existingUser = this._userService.GetQueryableEntity(e => e.Name == userName && e.Password == password);

            if (existingUser != null)
            {
                var tokenGenerator = new TokenGenerator(this._encodingKey);
                var userModel = base.Mapper.Map<UserModel>(existingUser);
                userModel.Token = tokenGenerator.GenerateToken(userModel.Id, userModel.UserType);
                return Ok(userModel);
            }

            return Ok("Wrong login or password");
        }
    }
}
