using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using Entities.Enums;
using Entities.Instances.Word;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers.Words
{
    public class WordController : BaseController
    {
        private readonly BaseEntityService<WordEntity> _service;
        
        public WordController(BaseEntityService<WordEntity> service, IMapper mapper): base(mapper)
        {
            this._service = service;
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public IEnumerable<WordModel> GetWords()
        {
            return base.Mapper.Map<List<WordModel>>(this._service.GetEntities());
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public WordModel CreateWord([FromBody] WordEntity wordEntity)
        {
            return base.Mapper.Map<WordModel>(this._service.CreateEntity(wordEntity));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public WordModel DeleteWord([FromBody] WordEntity wordEntity)
        {
            return base.Mapper.Map<WordModel>(this._service.DeleteEntity(wordEntity));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public WordModel UpdateWord([FromBody] WordEntity wordEntity)
        {
            return base.Mapper.Map<WordModel>(this._service.UpdateEntity(wordEntity));
        }
    }
}
