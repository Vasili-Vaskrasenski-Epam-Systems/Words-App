using System;
using System.Linq;
using AutoMapper;
using BL.Services;
using Entities.Enums;
using Entities.Instances.Task.SentenceTask;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models.TaskModels.SentenceTaskModels;
using WordApp.Models.TaskModels.WordTaskModels;

namespace WordApp.Controllers.Sentences
{
    public class SentenceTaskController: BaseController
    {
        private readonly BaseEntityService<SentenceTaskEntity> _service;
        public SentenceTaskController(IMapper mapper, BaseEntityService<SentenceTaskEntity> taskService) : base(mapper)
        {
            this._service = taskService;
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher))]
        public IActionResult GetSentenceTasks()
        {
            return Ok(this._service.GetEntities().Select(e => base.Mapper.Map<SentenceTaskModel>(e)).ToList());
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher))]
        public IActionResult CreateSentenceTask([FromBody] SentenceTaskModel model)
        {
            var entityToCreate = base.Mapper.Map<SentenceTaskEntity>(model);
            var createdEntity = this._service.CreateEntity(entityToCreate);
            return Ok(base.Mapper.Map<SentenceTaskModel>(createdEntity));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher))]
        public IActionResult DeleteSentenceTask([FromBody] SentenceTaskModel model)
        {
            var entityToDelete = base.Mapper.Map<SentenceTaskEntity>(model);
            var deletedEntity = this._service.DeleteEntity(entityToDelete);
            return Ok(base.Mapper.Map<SentenceTaskModel>(deletedEntity));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher))]
        public IActionResult UpdateSentenceTask([FromBody] SentenceTaskModel model)
        {
            var entityToAct = base.Mapper.Map<SentenceTaskEntity>(model);
            var actedEntity = this._service.UpdateEntity(entityToAct);
            return Ok(base.Mapper.Map<SentenceTaskModel>(actedEntity));
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher))]
        public IActionResult GetTaskDetails(Guid taskId)
        {
            var taskEntity = this._service.GetQueryableEntity(taskId, new[] { "Sentences", "Sentences.Sentence", "AssignedSentenceTasks", "AssignedSentenceTasks.User" });
            var mappedEntity = base.Mapper.Map<SentenceTaskDetailsModel>(taskEntity);
            return Ok(mappedEntity);
        }
    }
}
