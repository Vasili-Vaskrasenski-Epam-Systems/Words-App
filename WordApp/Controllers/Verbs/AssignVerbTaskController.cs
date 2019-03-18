using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using Entities.Instances.Task.VerbTask;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models.TaskModels.VerbTaskModels;

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
    }
}
