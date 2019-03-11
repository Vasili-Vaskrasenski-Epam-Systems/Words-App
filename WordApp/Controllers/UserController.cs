using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using AutoMapper;
using BL.Infrastructure.Builder;
using BL.Services;
using Entities.Enums;
using Entities.Instances;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers
{
    public class UserController: BaseController
    {
        private readonly BaseEntityService<UserEntity> _service;
        public UserController(IMapper mapper, BaseEntityService<UserEntity> service) : base(mapper)
        {
            this._service = service;
        }

        [HttpPost("[action]")]
        public IActionResult Register([FromBody] UserModel model)
        {
            model.UserType = UserType.Pupil;
            return this.CreateUser(model);
        }

        [HttpPost("[action]")]
        public IActionResult CreateUser([FromBody] UserModel model)
        {
            var userToCreate = base.Mapper.Map<UserEntity>(model);
            var createdUser = this._service.CreateEntity(userToCreate);
            return Ok(base.Mapper.Map<UserModel>(createdUser));
        }

        [HttpPost("[action]")]
        public IActionResult Login(string userName, string password)
        {
            var expression = ExpressionBuilder.BuildExpression<UserEntity>(new Tuple<string, string, ExpressionMethod>[]
            {
                new Tuple<string, string, ExpressionMethod>("Name", userName, ExpressionMethod.Equal), 
                new Tuple<string, string, ExpressionMethod>("Password", password, ExpressionMethod.Equal), 
            });

            var result = this._service.GetEntities(expression);

            if (result.Any())
            {
                return Ok(base.Mapper.Map<UserModel>(result.First()));
            }

            return Ok("Wrong login or password");
        }

        [HttpGet("[action]")]
        public IActionResult GetUsers()
        {
            return Ok(this._service.GetEntities().Select(e => Mapper.Map<UserModel>(e)).ToList());
        }

        [HttpPost("[action]")]
        public IActionResult DeleteUser([FromBody] UserModel model)
        {
            var userToDelete = base.Mapper.Map<UserEntity>(model);
            var deletedUser = this._service.DeleteEntity(userToDelete);
            return Ok(base.Mapper.Map<UserModel>(deletedUser));
        }

        [HttpPost("[action]")]
        public IActionResult UpdateUser([FromBody] UserModel model)
        {
            var userToUpdate = base.Mapper.Map<UserEntity>(model);
            var updatedUser = this._service.UpdateEntity(userToUpdate);
            return Ok(base.Mapper.Map<UserModel>(updatedUser));
        }

    }
}
