using System.Linq;
using AutoMapper;
using BL.Services;
using Entities.Instances;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers
{
    public class TaskController: BaseController
    {
        private readonly BaseEntityService<TaskEntity> _service;
        public TaskController(IMapper mapper, BaseEntityService<TaskEntity> taskService) : base(mapper)
        {
            this._service = taskService;
        }

        [HttpGet("[action]")]
        public IActionResult GetTasks()
        {
            return Ok(this._service.GetEntities().Select(e => base.Mapper.Map<TaskModel>(e)).ToList());
        }

        [HttpPost("[action]")]
        public IActionResult CreateTask([FromBody] TaskModel model)
        {
            var entityToCreate = base.Mapper.Map<TaskEntity>(model);
            var createdEntity = this._service.CreateEntity(entityToCreate);
            return Ok(base.Mapper.Map<TaskModel>(createdEntity));
        }

        [HttpPost("[action]")]
        public IActionResult DeleteTask([FromBody] TaskModel model)
        {
            var entityToDelete = base.Mapper.Map<TaskEntity>(model);
            var deletedEntity = this._service.DeleteEntity(entityToDelete);
            return Ok(base.Mapper.Map<TaskModel>(deletedEntity));
        }

        [HttpPost("[action]")]
        public IActionResult UpdateTask([FromBody] TaskModel model)
        {
            var entityToAct = base.Mapper.Map<TaskEntity>(model);
            var actedEntity = this._service.UpdateEntity(entityToAct);
            return Ok(base.Mapper.Map<TaskModel>(actedEntity));
        }
    }
}
