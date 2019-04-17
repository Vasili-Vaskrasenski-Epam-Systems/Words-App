using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using BL.Infrastructure.Builder;
using BL.Infrastructure.Encoders;
using BL.Services;
using Entities.Enums;
using Entities.Instances;
using Entities.Instances.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WordApp.Infrastructure;
using WordApp.Models;
using WordApp.Models.User;

namespace WordApp.Controllers
{
    public class UserController: BaseController
    {
        private readonly BaseEntityService<UserEntity> _service;
        private readonly IJwtSigningEncodingKey _singingEncodingKey;
        public UserController(IMapper mapper, BaseEntityService<UserEntity> service,[FromServices] IJwtSigningEncodingKey singingEncodingKey) : base(mapper)
        {
            this._service = service;
            this._singingEncodingKey = singingEncodingKey;
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator))]
        public IActionResult CreateUser([FromBody] UserModel model)
        {
            var userToCreate = base.Mapper.Map<UserEntity>(model);
            userToCreate.UserProfile = new UserProfileEntity();
            var createdUser = this._service.CreateEntity(userToCreate);
            return Ok(base.Mapper.Map<UserModel>(createdUser));
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator))]
        public IActionResult GetUsers()
        {
            return Ok(this._service.GetEntities().Select(e => Mapper.Map<UserModel>(e)).ToList());
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator))]
        public IActionResult DeleteUser([FromBody] UserModel model)
        {
            var userToDelete = base.Mapper.Map<UserEntity>(model);
            var deletedUser = this._service.DeleteEntity(userToDelete);
            return Ok(base.Mapper.Map<UserModel>(deletedUser));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator))]
        public IActionResult UpdateUser([FromBody] UserModel model)
        {
            var userToUpdate = base.Mapper.Map<UserEntity>(model);
            var updatedUser = this._service.UpdateEntity(userToUpdate);
            return Ok(base.Mapper.Map<UserModel>(updatedUser));
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher))]
        public IActionResult GetUsersByType(UserType userType)
        {
            var foundUsers = this._service.GetEntities(u => u.UserType == userType);
            return Ok(foundUsers.Select(fu => base.Mapper.Map<UserModel>(fu)).ToList());
        }
    }
}
