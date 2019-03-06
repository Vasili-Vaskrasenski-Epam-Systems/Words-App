using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using Entities.Instances;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers
{
    public class IrregularVerbController: BaseController
    {
        private readonly IEntityService<IrregularVerbEntity> _irregularVerbService;
        public IrregularVerbController(IMapper mapper, IEntityService<IrregularVerbEntity> irregularVerbService) : base(mapper)
        {
            this._irregularVerbService = irregularVerbService;
        }

        [HttpGet("[action]")]
        public IEnumerable<IrregularVerbModel> GetIrregularVerbs()
        {
            var entities = this._irregularVerbService.GetEntities();
            return base.Mapper.Map<List<IrregularVerbModel>>(entities);
        }

        [HttpPost("[action]")]
        public IrregularVerbModel UpdateIrregularVerb([FromBody] IrregularVerbModel verbModel)
        {
            var verbToUpdate = base.Mapper.Map<IrregularVerbEntity>(verbModel);
            var updatedVerb = this._irregularVerbService.UpdateEntity(verbToUpdate);
            return base.Mapper.Map<IrregularVerbModel>(updatedVerb);
        }

        [HttpPost("[action]")]
        public IrregularVerbModel CreateIrregularVerb([FromBody] IrregularVerbModel verbModel)
        {
            var verbToCreate = base.Mapper.Map<IrregularVerbEntity>(verbModel);
            var createdVerb = this._irregularVerbService.CreateEntity(verbToCreate);
            return base.Mapper.Map<IrregularVerbModel>(createdVerb);
        }

        [HttpPost("[action]")]
        public IrregularVerbModel DeleteIrregularVerb([FromBody] IrregularVerbModel verbModel)
        {
            var verbToDelete = base.Mapper.Map<IrregularVerbEntity>(verbModel);
            var deletedVerb = this._irregularVerbService.DeleteEntity(verbToDelete);
            return base.Mapper.Map<IrregularVerbModel>(deletedVerb);
        }
    }
}
