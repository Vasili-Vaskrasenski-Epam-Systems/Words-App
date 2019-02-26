using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers
{
    [Route("api/[controller]")]
    public class IrregularVerbsController: BaseController
    {
        private readonly IEntityService<IrregularVerbEntity> _irregularVerbService;
        public IrregularVerbsController(IMapper mapper, IEntityService<IrregularVerbEntity> irregularVerbService) : base(mapper)
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
        public IrregularVerbModel CreateIrregularVerb([FromBody] IrregularVerbModel verbModel)
        {
            var createdVerb = this._irregularVerbService.CreateEntity(base.Mapper.Map<IrregularVerbEntity>(verbModel));

            return Mapper.Map<IrregularVerbModel>(createdVerb);
        }
    }
}
