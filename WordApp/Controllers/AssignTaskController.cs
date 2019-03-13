using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using Entities.Instances;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

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
    }
}
