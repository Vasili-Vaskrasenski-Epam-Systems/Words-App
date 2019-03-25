using System;
using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using Entities.Enums;
using Entities.Instances.Task.VerbTask;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models.TaskModels.VerbTaskModels;

namespace WordApp.Controllers.Verbs
{
    public class AssignVerbTaskController : BaseController
    {
        private readonly BaseEntityService<AssignedVerbTaskEntity> _service;
        public AssignVerbTaskController(IMapper mapper, BaseEntityService<AssignedVerbTaskEntity> service) : base(mapper)
        {
            this._service = service;
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher))]
        public IActionResult AssignVerbsToTask([FromBody]List<AssignVerbTaskModel> models)
        {
            var entitiesToCreate = base.Mapper.Map<List<AssignedVerbTaskEntity>>(models);
            var createdEntities = this._service.CreateEntities(entitiesToCreate);
            return Ok(base.Mapper.Map<List<AssignVerbTaskModel>>(createdEntities));
        }


        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher))]
        public IActionResult UnassignTask([FromBody] AssignVerbTaskModel model)
        {
            var entityToDelete = base.Mapper.Map<AssignedVerbTaskEntity>(model);
            var deletedEntity = this._service.DeleteEntity(entityToDelete);
            return Ok(base.Mapper.Map<AssignVerbTaskModel>(deletedEntity));
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher) + "," + nameof(UserType.Pupil))]
        public IActionResult GetPupilTasks(Guid userId)
        {
            var includeProperties = new[] { "VerbTask" };
            var entities = this._service.GetQueryableEntities(e => e.UserId == userId, includeProperties);
            var mappedEntities = base.Mapper.Map<List<AssignVerbTaskModel>>(entities);

            return Ok(mappedEntities);
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher) + "," + nameof(UserType.Pupil))]
        public IActionResult GetPupilTask(Guid userId, Guid assignedTaskId)
        {
            var includeProperties = new[] { "VerbTask", "VerbTask.TaskVerbs", "VerbTask.TaskVerbs.Verb", "VerbTask.TaskVerbs.Verb.WordVerbs", "VerbTask.TaskVerbs.Verb.WordVerbs.Word" };
            var entity = this._service.GetQueryableEntity(e => e.UserId == userId && e.Id == assignedTaskId, includeProperties);
            var mappedEntity = base.Mapper.Map<AssignVerbTaskModel>(entity);
            return Ok(mappedEntity);
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher) + "," + nameof(UserType.Pupil))]
        public IActionResult GetCompletedTask(Guid taskId)
        {
            var includeProperties = new[] { "AnsweredVerbs", "AnsweredVerbs.Answer", "AnsweredVerbs.Verb", "AnsweredVerbs.Verb.WordVerbs", "AnsweredVerbs.Verb.WordVerbs.Word" };
            var entity = this._service.GetQueryableEntity(taskId, includeProperties);
            var mappedEntity = base.Mapper.Map<AssignVerbTaskModel>(entity);

            return Ok(mappedEntity);
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil))]
        public IActionResult CompleteVerbTask([FromBody] AssignVerbTaskModel model)
        {
            model.CompleteDate = DateTime.UtcNow;

            if (model.CompleteDate.Value.Date > model.Deadline.Date)
            {
                model.TaskStatus = TaskStatus.Failed;
            }

            var entityToUpdate = base.Mapper.Map<AssignedVerbTaskEntity>(model);
            this._service.UpdateEntity(entityToUpdate);
            return Ok();
        }
    }
}
