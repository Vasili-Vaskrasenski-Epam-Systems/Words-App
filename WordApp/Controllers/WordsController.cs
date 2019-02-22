using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace WordApp.Controllers
{
    [Route("api/[controller]")]
    public class WordsController : Controller
    {
        private readonly WordsDbContext _context;
        public WordsController(WordsDbContext context)
        {
            this._context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<WordEntity> GetWords()
        {
            var words = this._context.Words.ToList();
            return words;
        }

        [HttpPost("[action]")]
        public WordEntity CreateWord([FromBody] WordEntity wordEntity)
        {
            this._context.Words.Add(wordEntity);
            this._context.SaveChanges();
            return wordEntity;
        }

        [HttpPost("[action]")]
        public WordEntity DeleteWord([FromBody] WordEntity wordEntity)
        {
            this._context.Words.Remove(wordEntity);
            this._context.SaveChanges();
            return wordEntity;
        }

        [HttpPost("[action]")]
        public WordEntity UpdateWord([FromBody] WordEntity wordEntity)
        {
            //var wordToUpdate = this._context.Words.FirstOrDefault(w => w.Id == wordEntity.Id);

            //wordToUpdate.Word = wordEntity.Word;
            //wordToUpdate.Transcription = wordEntity.Transcription;
            //wordToUpdate.Translation = wordEntity.Translation;
            //wordToUpdate.RowVersion = wordEntity.RowVersion;

            this._context.Words.Update(wordEntity);
            this._context.SaveChanges();

            return wordEntity;
        }
    }
}
