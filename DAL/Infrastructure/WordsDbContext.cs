using Entities.Instances;
using Entities.Instances.Task;
using Entities.Instances.Task.VerbTask;
using Entities.Instances.Task.WordTask;
using Entities.Instances.Verb;
using Entities.Instances.Word;
using Microsoft.EntityFrameworkCore;

namespace DAL.Infrastructure
{
    public class WordsDbContext : DbContext
    {
        public WordsDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<WordEntity> Words { get; set; }
        public DbSet<VerbEntity> Verbs { get; set; }
        public DbSet<RelWordVerbEntity> RelWordVerbs { get; set; }
        public DbSet<WordTaskEntity> WordTasks { get; set; }
        public DbSet<RelTaskWordEntity> RelWordTasks { get; set; }
        public DbSet<AssignedWordTaskEntity> AssignedWordTasks { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<RelAnswerWordEntity> RelAnsweredWords { get; set; }
        public DbSet<WordAnswerEntity> WordAnswers { get; set; }
        public DbSet<VerbAnswerEntity> VerbAnswers { get; set; }
        public DbSet<RelAnsweredVerbEntity> RelAnswerVerb { get; set; }
        public DbSet<AssignedVerbTaskEntity> AssignedVerbTasks { get; set; }
        public DbSet<RelVerbTaskEntity> RelVerbTasks { get; set; }
        public DbSet<VerbTaskEntity> VerbTasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new WordConfigurator());
            modelBuilder.ApplyConfiguration(new VerbConfigurator());
            modelBuilder.ApplyConfiguration(new VerbWordConfigurator());
            modelBuilder.ApplyConfiguration(new WordTaskConfigurator());
            modelBuilder.ApplyConfiguration(new TaskWordConfigurator());
            modelBuilder.ApplyConfiguration(new AssignedWordTaskConfigurator());
            modelBuilder.ApplyConfiguration(new UserConfigurator());
            modelBuilder.ApplyConfiguration(new AnsweredWordConfigurator());
            modelBuilder.ApplyConfiguration(new AnsweredWordConfigurator());

            modelBuilder.ApplyConfiguration(new AnsweredVerbConfigurator());
            modelBuilder.ApplyConfiguration(new VerbAnswerConfigurator());
            modelBuilder.ApplyConfiguration(new AssignedVerbTaskConfigurator());
            modelBuilder.ApplyConfiguration(new VerbTaskConfigurator());
            modelBuilder.ApplyConfiguration(new RelVerbTaskConfigurator());
        }
    }
}
