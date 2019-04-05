using System;
using System.Linq;
using AutoMapper;
using BL.Services;
using Entities.Enums;
using Entities.Instances.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models.User;

namespace WordApp.Controllers.User
{
    public class UserController: BaseController
    {
        private readonly BaseEntityService<UserEntity> _userService;
        public UserController(IMapper mapper, BaseEntityService<UserEntity> service) : base(mapper)
        {
            this._userService = service;
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator))]
        public IActionResult CreateUser([FromBody] UserModel model)
        {
            var userToCreate = base.Mapper.Map<UserEntity>(model);
            var createdUser = this._userService.CreateEntity(userToCreate);
            return Ok(base.Mapper.Map<UserModel>(createdUser));
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator))]
        public IActionResult GetUsers()
        {
            return Ok(this._userService.GetEntities().Select(e => Mapper.Map<UserModel>(e)).ToList());
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator))]
        public IActionResult DeleteUser([FromBody] UserModel model)
        {
            var userToDelete = base.Mapper.Map<UserEntity>(model);
            var deletedUser = this._userService.DeleteEntity(userToDelete);
            return Ok(base.Mapper.Map<UserModel>(deletedUser));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator))]
        public IActionResult UpdateUser([FromBody] UserModel model)
        {
            var userToUpdate = base.Mapper.Map<UserEntity>(model);
            var updatedUser = this._userService.UpdateEntity(userToUpdate);
            return Ok(base.Mapper.Map<UserModel>(updatedUser));
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public IActionResult GetUserProfile(Guid userId)
        {
            var user = this._userService.GetQueryableEntity(userId, "UserProfile");
            return Ok(base.Mapper.Map<UserProfileModel>(user));
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher))]
        public IActionResult GetUsersByType(UserType userType)
        {
            var foundUsers = this._userService.GetEntities(u => u.UserType == userType);
            return Ok(foundUsers.Select(fu => base.Mapper.Map<UserModel>(fu)).ToList());
        }
    }
}
