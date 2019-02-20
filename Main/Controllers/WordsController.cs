using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Main.Controllers
{
    public class WordsController : Controller
    {
        private readonly WordsDbContext _context;

        public WordsController(WordsDbContext context)
        {
            this._context = context; 
        }

        public IActionResult Index()
        {
            var words = this._context.Words.ToList();

            return View("Index", words);
        }

        public IActionResult Create()
        {
            var word = new WordEntity();
            return View(word);
        }

        [HttpPost]
        public IActionResult Create([Bind("Word, Transcription, Translation")] WordEntity entity)
        {
            this._context.Words.Add(entity);
            this._context.SaveChanges();

            return Index();
        }
    }
}