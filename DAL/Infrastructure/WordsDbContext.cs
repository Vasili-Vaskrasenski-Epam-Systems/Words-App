using System;
using System.Collections.Generic;
using System.Text;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL.Infrastructure
{
    public class WordsDbContext: DbContext
    {
        public WordsDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<WordEntity> Words { get; set; }
        public DbSet<IrregularVerbEntity> IrregularVerbs { get; set; }
        public DbSet<WordVerbEntity> WordVerbs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new WordConfigurator());
            modelBuilder.ApplyConfiguration(new IrregularVerbConfigurator());
            modelBuilder.ApplyConfiguration(new VerbWordConfigurator());
        }
    }
}
