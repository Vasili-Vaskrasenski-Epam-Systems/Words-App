using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BL.Services;
using Entities.Instances.Task.VerbTask;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models.TaskModels.VerbTaskModels;
using WordApp.Models.TaskModels.WordTaskModels;

namespace WordApp.Controllers.Verbs
{
    public class VerbTaskController: BaseController
    {
        private readonly BaseEntityService<VerbTaskEntity> _service;
        public VerbTaskController(IMapper mapper, BaseEntityService<VerbTaskEntity> service) : base(mapper)
        {
            this._service = service;
        }

        [HttpGet("[action]")]
        public IActionResult GetVerbTasks()
        {
            var properties = new[] { "TaskVerbs", "TaskVerbs.Verb" };
            var entities = this._service.GetQueryableEntities(properties).ToList();
            return Ok(base.Mapper.Map<List<VerbTaskModel>>(entities));
        }

        [HttpPost("[action]")]
        public IActionResult CreateVerbTask([FromBody] VerbTaskModel model)
        {
            var entityToCreate = base.Mapper.Map<VerbTaskEntity>(model);
            var createdEntity = this._service.CreateEntity(entityToCreate);
            return Ok(base.Mapper.Map<VerbTaskModel>(createdEntity));
        }

        [HttpPost("[action]")]
        public IActionResult UpdateVerbTask([FromBody] VerbTaskModel model)
        {
            var entityToUpdate = base.Mapper.Map<VerbTaskEntity>(model);
            var updatedEntity = this._service.UpdateEntity(entityToUpdate);
            return Ok(base.Mapper.Map<VerbTaskModel>(updatedEntity));
        }

        [HttpPost("[action]")]
        public IActionResult DeleteVerbTask([FromBody] VerbTaskModel model)
        {
            var entityToDelete = base.Mapper.Map<VerbTaskEntity>(model);
            var deletedEntity = this._service.UpdateEntity(entityToDelete);
            return Ok(model);
        }

        [HttpGet("[action]")]
        public IActionResult GetTaskDetails(Guid taskId)
        {
            var taskEntity = this._service.GetQueryableEntity(taskId, new[] { "TaskVerbs", "TaskVerbs.Verb", "TaskVerbs.Verb.WordVerbs", "TaskVerbs.Verb.WordVerbs.Word",
                "AssignedVerbs", "AssignedVerbs.User" });

            var foo = base.Mapper.Map<VerbTaskDetailsModel>(taskEntity);
            return Ok(foo);
        }
    }
}
