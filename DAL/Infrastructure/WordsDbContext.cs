using Entities.Instances;
using Microsoft.EntityFrameworkCore;

namespace DAL.Infrastructure
{
    public class WordsDbContext : DbContext
    {
        public WordsDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<WordEntity> Words { get; set; }
        public DbSet<IrregularVerbEntity> IrregularVerbs { get; set; }
        public DbSet<WordVerbEntity> WordVerbs { get; set; }
        public DbSet<TaskEntity> Tasks { get; set; }
        public DbSet<TaskWordEntity> TaskWords { get; set; }
        public DbSet<AssignedTaskEntity> AssignedTasks { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<AnsweredWordEntity> AnsweredWords { get; set; }
        public DbSet<AnswerEntity> Answers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new WordConfigurator());
            modelBuilder.ApplyConfiguration(new IrregularVerbConfigurator());
            modelBuilder.ApplyConfiguration(new VerbWordConfigurator());
            modelBuilder.ApplyConfiguration(new TaskConfigurator());
            modelBuilder.ApplyConfiguration(new TaskWordConfigurator());
            modelBuilder.ApplyConfiguration(new AssignedTaskConfigurator());
            modelBuilder.ApplyConfiguration(new UserConfigurator());
            modelBuilder.ApplyConfiguration(new AnsweredWordConfigurator());
            modelBuilder.ApplyConfiguration(new AnswerConfigurator());
        }
    }
}
