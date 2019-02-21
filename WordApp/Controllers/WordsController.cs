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
    }
}
