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
            return base.Mapper.Map<List<IrregularVerbModel>>(this._irregularVerbService.GetEntities());
        }
    }
}
