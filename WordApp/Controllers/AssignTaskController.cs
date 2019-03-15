using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BL.Services;
using Entities.Instances;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using WordApp.Models;
using WordApp.Models.TaskModels.WordTaskModels;

namespace WordApp.Controllers
{
    public class AssignTaskController: BaseController
    {
        public readonly BaseEntityService<AssignedWordTaskEntity> _service;
        public AssignTaskController(IMapper mapper, BaseEntityService<AssignedWordTaskEntity> service) : base(mapper)
        {
            this._service = service;
        }

        [HttpPost("[action]")]
        public IActionResult AssignWordTasks([FromBody]List<AssignableWordTaskModel> models)
        {
            var entitiesToCreate = base.Mapper.Map<List<AssignedWordTaskEntity>>(models);
            var createdEntities = this._service.CreateEntities(entitiesToCreate);
            return Ok(base.Mapper.Map<List<AssignableWordTaskModel>>(createdEntities));
        }

        [HttpPost("[action]")]
        public IActionResult UnassignWordTask([FromBody] AssignableWordTaskModel model)
        {
            var entityToDelete = base.Mapper.Map<AssignedWordTaskEntity>(model);
            var deletedEntity = this._service.DeleteEntity(entityToDelete);
            return Ok(base.Mapper.Map<AssignableWordTaskModel>(deletedEntity));
        }

        [HttpGet("[action]")]
        public IActionResult GetPupilTasks(Guid userId)
        {
            var includeProperties = new[] {"WordTask", "User", "WordTask.TaskWords", "WordTask.TaskWords.Word"};
            var entities = this._service.GetQueryableEntities(e => e.UserId == userId, includeProperties);
            var entitiesToMap = new List<WordTaskEntity>(entities.Select(e => e.WordTask));
            var mappedEntities = base.Mapper.Map<List<WordTaskDetailsModel>>(entitiesToMap);

            return Ok(mappedEntities);
        }

        [HttpGet("[action]")]
        public IActionResult GetCompletedTask(Guid taskId)
        {
            var includeProperties = new[] {"AnsweredWords", "AnsweredWords.Answer", "AnsweredWords.Word" };
            var entity = this._service.GetQueryableEntity(taskId, includeProperties);
            var mappedEntity = base.Mapper.Map<AssignableWordTaskModel>(entity);

            return Ok(mappedEntity);
        }

        [HttpPost("[action]")]
        public IActionResult CompleteWordTask([FromBody] AssignableWordTaskModel model)
        {
            model.CompleteDate = DateTime.UtcNow;
            var entityToUpdate = base.Mapper.Map<AssignedWordTaskEntity>(model);
            this._service.UpdateEntity(entityToUpdate);
            return Ok();
        }
    }
}
