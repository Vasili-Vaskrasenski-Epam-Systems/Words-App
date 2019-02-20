using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace DAL.Infrastructure
{
    public class WordsDbContext: DbContext
    {
        public WordsDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new WordConfigurator());
            modelBuilder.ApplyConfiguration(new IrregularVerbConfigurator());
            modelBuilder.ApplyConfiguration(new VerbWordConfigurator());
        }
    }
}
