using System;
using System.Collections.Generic;
using System.Linq;
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
        public UserModel Register([FromBody] UserModel model)
        {
            var userToCreate = base.Mapper.Map<UserEntity>(model);
            userToCreate.UserType = UserType.Pupil;
            var createdUser = this._service.CreateEntity(userToCreate);
            return base.Mapper.Map<UserModel>(createdUser);
        }

        [HttpPost("[action]")]
        public UserModel Login(string userName, string password)
        {
            var expression = ExpressionBuilder.BuildExpression<UserEntity>(new Tuple<string, string, ExpressionMethod>[]
            {
                new Tuple<string, string, ExpressionMethod>("Name", userName, ExpressionMethod.Equal), 
                new Tuple<string, string, ExpressionMethod>("Password", password, ExpressionMethod.Equal), 
            });

            var result = this._service.GetEntities(expression);

            if (result.Any())
            {
                return base.Mapper.Map<UserModel>(result.First());
            }
            else throw new KeyNotFoundException("Пользователь с таким логином и паролем не найден");
        }
    }
}
