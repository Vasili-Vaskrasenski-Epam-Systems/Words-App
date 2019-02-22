using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers
{
    [Route("api/[controller]")]
    public class WordsController : BaseController
    {
        private readonly IEntityService<WordEntity> _service;
        
        public WordsController(IEntityService<WordEntity> service, IMapper mapper): base(mapper)
        {
            this._service = service;
        }

        [HttpGet("[action]")]
        public IEnumerable<WordModel> GetWords()
        {
            return base.Mapper.Map<List<WordModel>>(this._service.GetEntities());
        }

        [HttpPost("[action]")]
        public WordModel CreateWord([FromBody] WordEntity wordEntity)
        {
            return base.Mapper.Map<WordModel>(this._service.CreateEntity(wordEntity));
        }

        [HttpPost("[action]")]
        public WordModel DeleteWord([FromBody] WordEntity wordEntity)
        {
            return base.Mapper.Map<WordModel>(this._service.DeleteEntity(wordEntity));
        }

        [HttpPost("[action]")]
        public WordModel UpdateWord([FromBody] WordEntity wordEntity)
        {
            //var wordToUpdate = this._context.Words.FirstOrDefault(w => w.Id == wordEntity.Id);

            //wordToUpdate.Word = wordEntity.Word;
            //wordToUpdate.Transcription = wordEntity.Transcription;
            //wordToUpdate.Translation = wordEntity.Translation;
            //wordToUpdate.RowVersion = wordEntity.RowVersion;

            return base.Mapper.Map<WordModel>(this._service.UpdateEntity(wordEntity));
        }
    }
}
