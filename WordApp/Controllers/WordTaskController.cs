using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BL.Services;
using Entities.Instances;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;
using WordApp.Models.TaskModels.WordTaskModels;

namespace WordApp.Controllers
{
    public class WordTaskController: BaseController
    {
        private readonly BaseEntityService<WordTaskEntity> _service;
        public WordTaskController(IMapper mapper, BaseEntityService<WordTaskEntity> taskService) : base(mapper)
        {
            this._service = taskService;
        }

        [HttpGet("[action]")]
        public IActionResult GetWordTasks()
        {
            return Ok(this._service.GetEntities().Select(e => base.Mapper.Map<WordTaskModel>(e)).ToList());
        }

        [HttpPost("[action]")]
        public IActionResult CreateWordTask([FromBody] WordTaskModel model)
        {
            var entityToCreate = base.Mapper.Map<WordTaskEntity>(model);
            var createdEntity = this._service.CreateEntity(entityToCreate);
            return Ok(base.Mapper.Map<WordTaskModel>(createdEntity));
        }

        [HttpPost("[action]")]
        public IActionResult DeleteWordTask([FromBody] WordTaskModel model)
        {
            var entityToDelete = base.Mapper.Map<WordTaskEntity>(model);
            var deletedEntity = this._service.DeleteEntity(entityToDelete);
            return Ok(base.Mapper.Map<WordTaskModel>(deletedEntity));
        }

        [HttpPost("[action]")]
        public IActionResult UpdateWordTask([FromBody] WordTaskModel model)
        {
            var entityToAct = base.Mapper.Map<WordTaskEntity>(model);
            var actedEntity = this._service.UpdateEntity(entityToAct);
            return Ok(base.Mapper.Map<WordTaskModel>(actedEntity));
        }

        [HttpGet("[action]")]
        public IActionResult GetTaskDetails(Guid taskId)
        {
            var taskEntity = this._service.GetQueryableEntity(taskId, new []{"TaskWords","TaskWords.Word", "AssignedWordTasks", "AssignedWordTasks.User"});

            var foo = base.Mapper.Map<WordTaskDetailsModel>(taskEntity);
            return Ok(foo);
        }
    }
}
