using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DAL.Infrastructure;
using Entities.Instances;
using Entities.Instances.Word;

namespace BL.Services
{
    public class WordService: BaseEntityService<WordEntity>
    {
        public WordService(WordsDbContext context): base(context)
        {
            
        }
    }
}
