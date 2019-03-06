using AutoMapper;
using BL.Services;
using Entities.Instances;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers
{
    public class UserController: BaseController
    {
        private readonly IEntityService<UserEntity> _service;
        protected UserController(IMapper mapper, IEntityService<UserEntity> service) : base(mapper)
        {
            this._service = service;
        }

        [HttpGet("[action]")]
        public UserModel RegisterUser([FromBody] UserModel model)
        {
            var userToCreate = base.Mapper.Map<UserEntity>(model);
            var createdUser = this._service.CreateEntity(userToCreate);
            return base.Mapper.Map<UserModel>(createdUser);
        }
    }
}
