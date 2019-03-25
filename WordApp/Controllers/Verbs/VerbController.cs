using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using Entities.Enums;
using Entities.Instances.Verb;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers.Verbs
{
    public class VerbController : BaseController
    {
        private readonly BaseEntityService<VerbEntity> _irregularVerbService;
        public VerbController(IMapper mapper, BaseEntityService<VerbEntity> irregularVerbService) : base(mapper)
        {
            this._irregularVerbService = irregularVerbService;
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher) + "," + nameof(UserType.Pupil))]
        public IEnumerable<VerbModel> GetVerbs()
        {
            var entities = this._irregularVerbService.GetEntities();
            return base.Mapper.Map<List<VerbModel>>(entities);
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher) + "," + nameof(UserType.Pupil))]
        public VerbModel UpdateVerb([FromBody] VerbModel verbModel)
        {
            var verbToUpdate = base.Mapper.Map<VerbEntity>(verbModel);
            var updatedVerb = this._irregularVerbService.UpdateEntity(verbToUpdate);
            return base.Mapper.Map<VerbModel>(updatedVerb);
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher) + "," + nameof(UserType.Pupil))]
        public VerbModel CreateVerb([FromBody] VerbModel verbModel)
        {
            var verbToCreate = base.Mapper.Map<VerbEntity>(verbModel);
            var createdVerb = this._irregularVerbService.CreateEntity(verbToCreate);
            return base.Mapper.Map<VerbModel>(createdVerb);
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Teacher) + "," + nameof(UserType.Pupil))]
        public VerbModel DeleteVerb([FromBody] VerbModel verbModel)
        {
            var verbToDelete = base.Mapper.Map<VerbEntity>(verbModel);
            var deletedVerb = this._irregularVerbService.DeleteEntity(verbToDelete);
            return base.Mapper.Map<VerbModel>(deletedVerb);
        }
    }
}
