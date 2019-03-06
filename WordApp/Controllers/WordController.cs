using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using Entities.Instances;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models;

namespace WordApp.Controllers
{
    public class WordController : BaseController
    {
        private readonly BaseEntityService<WordEntity> _service;
        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(typeof(WordController));

        public WordController(BaseEntityService<WordEntity> service, IMapper mapper): base(mapper)
        {
            this._service = service;
        }

        [HttpGet("[action]")]
        public IEnumerable<WordModel> GetWords()
        {
            _log.Info("Get");
            return base.Mapper.Map<List<WordModel>>(this._service.GetEntities());
        }

        [HttpPost("[action]")]
        public WordModel CreateWord([FromBody] WordEntity wordEntity)
        {
            _log.Info("Create");
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
