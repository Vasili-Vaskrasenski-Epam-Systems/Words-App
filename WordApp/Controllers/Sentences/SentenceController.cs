using System.Collections.Generic;
using AutoMapper;
using BL.Services;
using Entities.Enums;
using Entities.Instances.Sentence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WordApp.Models.Sentences;

namespace WordApp.Controllers.Sentences
{
    public class SentenceController : BaseController
    {
        private readonly BaseEntityService<SentenceEntity> _sentenceService;
        public SentenceController(IMapper mapper, BaseEntityService<SentenceEntity> service) : base(mapper)
        {
            this._sentenceService = service;
        }

        [HttpGet("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public IActionResult GetSentences()
        {
            var properties = new[] { "Translations" };
            var sentences = this._sentenceService.GetQueryableEntities(properties);
            return Ok(base.Mapper.Map<List<SentenceModel>>(sentences));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public IActionResult CreateSentence([FromBody] SentenceModel sentenceModel)
        {
            var sentenceEntity = base.Mapper.Map<SentenceEntity>(sentenceModel);
            return Ok(base.Mapper.Map<SentenceModel>(this._sentenceService.CreateEntity(sentenceEntity)));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public IActionResult DeleteSentence([FromBody] SentenceModel sentenceModel)
        {
            var sentenceEntity = base.Mapper.Map<SentenceEntity>(sentenceModel);
            return Ok(base.Mapper.Map<SentenceModel>(this._sentenceService.DeleteEntity(sentenceEntity)));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = nameof(UserType.Administrator) + "," + nameof(UserType.Pupil) + "," + nameof(UserType.Teacher))]
        public IActionResult UpdateSentence([FromBody] SentenceModel sentenceModel)
        {
            var sentenceEntity = base.Mapper.Map<SentenceEntity>(sentenceModel);
            return Ok(base.Mapper.Map<SentenceModel>(this._sentenceService.UpdateEntity(sentenceEntity)));
        }
    }
}
