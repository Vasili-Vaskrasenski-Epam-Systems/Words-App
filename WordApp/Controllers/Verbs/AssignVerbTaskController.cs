﻿using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BL.Services;
using Entities.Instances.Task.VerbTask;
using Entities.Instances.Task.WordTask;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models.TaskModels.VerbTaskModels;
using WordApp.Models.TaskModels.WordTaskModels;

namespace WordApp.Controllers.Verbs
{
    public class AssignVerbTaskController: BaseController
    {
        private readonly BaseEntityService<AssignedVerbTaskEntity> _service;
        public AssignVerbTaskController(IMapper mapper, BaseEntityService<AssignedVerbTaskEntity> service) : base(mapper)
        {
            this._service = service;
        }

        [HttpPost("[action]")]
        public IActionResult AssignVerbsToTask([FromBody]List<AssignVerbTaskModel> models)
        {
            var entitiesToCreate = base.Mapper.Map<List<AssignedVerbTaskEntity>>(models);
            var createdEntities = this._service.CreateEntities(entitiesToCreate);
            return Ok(base.Mapper.Map<List<AssignVerbTaskModel>>(createdEntities));
        }

        [HttpPost("[action]")]
        public IActionResult UnassignTask([FromBody] AssignVerbTaskModel model)
        {
            var entityToDelete = base.Mapper.Map<AssignedVerbTaskEntity>(model);
            var deletedEntity = this._service.DeleteEntity(entityToDelete);
            return Ok(base.Mapper.Map<AssignVerbTaskModel>(deletedEntity));
        }

        [HttpGet("[action]")]
        public IActionResult GetPupilTasks(Guid userId)
        {
            var includeProperties = new[] { "VerbTask", "User", "VerbTask.TaskVerbs", "VerbTask.TaskVerbs.Verb", "VerbTask.TaskVerbs.Verb.WordVerbs", "VerbTask.TaskVerbs.Verb.WordVerbs.Word" };
            var entities = this._service.GetQueryableEntities(e => e.UserId == userId, includeProperties);
            //var entitiesToMap = new List<VerbTaskEntity>(entities.Select(e => e.VerbTask));
            var mappedEntities = base.Mapper.Map<List<AssignVerbTaskModel>>(entities);

            return Ok(mappedEntities);
        }

        [HttpGet("[action]")]
        public IActionResult GetCompletedTask(Guid taskId)
        {
            var includeProperties = new[] { "AnsweredVerbs", "AnsweredVerbs.Answer", "AnsweredVerbs.Verb", "AnsweredVerbs.Verb.WordVerbs", "AnsweredVerbs.Verb.WordVerbs.Word" };
            var entity = this._service.GetQueryableEntity(taskId, includeProperties);
            var mappedEntity = base.Mapper.Map<AssignVerbTaskModel>(entity);

            return Ok(mappedEntity);
        }

        [HttpPost("[action]")]
        public IActionResult CompleteVerbTask([FromBody] AssignVerbTaskModel model)
        {
            model.CompleteDate = DateTime.UtcNow;
            var entityToUpdate = base.Mapper.Map<AssignedVerbTaskEntity>(model);
            this._service.UpdateEntity(entityToUpdate);
            return Ok();
        }
    }
}
