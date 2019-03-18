using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using Entities.Instances.Verb;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers.Verbs
{
    public class VerbController: BaseController
    {
        private readonly BaseEntityService<VerbEntity> _irregularVerbService;
        public VerbController(IMapper mapper, BaseEntityService<VerbEntity> irregularVerbService) : base(mapper)
        {
            this._irregularVerbService = irregularVerbService;
        }

        [HttpGet("[action]")]
        public IEnumerable<VerbModel> GetVerbs()
        {
            var entities = this._irregularVerbService.GetEntities();
            return base.Mapper.Map<List<VerbModel>>(entities);
        }

        [HttpPost("[action]")]
        public VerbModel UpdateVerb([FromBody] VerbModel verbModel)
        {
            var verbToUpdate = base.Mapper.Map<VerbEntity>(verbModel);
            var updatedVerb = this._irregularVerbService.UpdateEntity(verbToUpdate);
            return base.Mapper.Map<VerbModel>(updatedVerb);
        }

        [HttpPost("[action]")]
        public VerbModel CreateVerb([FromBody] VerbModel verbModel)
        {
            var verbToCreate = base.Mapper.Map<VerbEntity>(verbModel);
            var createdVerb = this._irregularVerbService.CreateEntity(verbToCreate);
            return base.Mapper.Map<VerbModel>(createdVerb);
        }

        [HttpPost("[action]")]
        public VerbModel DeleteVerb([FromBody] VerbModel verbModel)
        {
            var verbToDelete = base.Mapper.Map<VerbEntity>(verbModel);
            var deletedVerb = this._irregularVerbService.DeleteEntity(verbToDelete);
            return base.Mapper.Map<VerbModel>(deletedVerb);
        }
    }
}
