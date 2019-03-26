using System;
using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using Entities.Enums;
using Entities.Instances.Task.SentenceTask;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models.TaskModels.SentenceTaskModels;

namespace WordApp.Controllers.Sentences
{
    public class AssignSentenceTaskController: BaseController
    {
        private readonly BaseEntityService<AssignedSentenceTaskEntity> _assignSentenceTaskService;
        public AssignSentenceTaskController(IMapper mapper, BaseEntityService<AssignedSentenceTaskEntity> service) : base(mapper)
        {
            this._assignSentenceTaskService = service;
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil))]
        public IActionResult AssignSentenceTasks([FromBody]List<AssignSentenceTaskModel> models)
        {
            var entitiesToCreate = base.Mapper.Map<List<AssignedSentenceTaskEntity>>(models);
            var createdEntities = this._assignSentenceTaskService.CreateEntities(entitiesToCreate);
            return Ok(base.Mapper.Map<List<AssignSentenceTaskModel>>(createdEntities));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil))]
        public IActionResult UnassignSentenceTask([FromBody] AssignSentenceTaskModel model)
        {
            var entityToDelete = base.Mapper.Map<AssignedSentenceTaskEntity>(model);
            var deletedEntity = this._assignSentenceTaskService.DeleteEntity(entityToDelete);
            return Ok(base.Mapper.Map<AssignSentenceTaskModel>(deletedEntity));
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public IActionResult GetPupilTasks(Guid userId)
        {
            var includeProperties = new[] { "SentenceTask" };
            var entities = this._assignSentenceTaskService.GetQueryableEntities(e => e.UserId == userId, includeProperties);
            var mappedEntities = base.Mapper.Map<List<AssignSentenceTaskModel>>(entities);

            return Ok(mappedEntities);
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher) + "," + nameof(UserType.Pupil))]
        public IActionResult GetPupilTask(Guid userId, Guid assignedTaskId)
        {
            var includeProperties = new[] { "SentenceTask", "SentenceTask.Sentences", "SentenceTask.Sentences.Sentence" };
            var entity = this._assignSentenceTaskService.GetQueryableEntity(e => e.UserId == userId && e.Id == assignedTaskId, includeProperties);
            var mappedEntity = base.Mapper.Map<AssignSentenceTaskModel>(entity);
            return Ok(mappedEntity);
        }


        [HttpGet("[action]")]
        [Authorize]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public IActionResult GetCompletedTask(Guid taskId)
        {
            var includeProperties = new[] { "SentenceTask", "AnsweredSentences", "AnsweredSentences.Answer", "AnsweredSentences.Sentence", "AnsweredSentences.Sentence.Translations" };
            var entity = this._assignSentenceTaskService.GetQueryableEntity(taskId, includeProperties);
            var mappedEntity = base.Mapper.Map<AssignSentenceTaskModel>(entity);

            return Ok(mappedEntity);
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil))]
        public IActionResult CompleteSentenceTask([FromBody] AssignSentenceTaskModel model)
        {
            model.CompleteDate = DateTime.UtcNow;

            if (model.CompleteDate.Value.Date > model.Deadline.Date)
            {
                model.TaskStatus = TaskStatus.Failed;
            }

            var entityToUpdate = base.Mapper.Map<AssignedSentenceTaskEntity>(model);
            this._assignSentenceTaskService.UpdateEntity(entityToUpdate);
            return Ok();
        }
    }
}
