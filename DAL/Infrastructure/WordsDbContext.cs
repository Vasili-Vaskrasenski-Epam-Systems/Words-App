using Entities.Instances;
using Entities.Instances.Sentence;
using Entities.Instances.Task.SentenceTask;
using Entities.Instances.Task.VerbTask;
using Entities.Instances.Task.WordTask;
using Entities.Instances.User;
using Entities.Instances.Verb;
using Entities.Instances.Word;
using Microsoft.EntityFrameworkCore;

namespace DAL.Infrastructure
{
    public class WordsDbContext :DbContext
    {
        public WordsDbContext(DbContextOptions<WordsDbContext> options) : base(options)
        {

        }

        public DbSet<UserEntity> ApplicationUsers { get; set; }
        public DbSet<UserProfileEntity> UserProfiles { get; set; }

        public DbSet<WordEntity> Words { get; set; }
        public DbSet<VerbEntity> Verbs { get; set; }
        public DbSet<RelWordVerbEntity> RelWordVerbs { get; set; }
        public DbSet<WordTaskEntity> WordTasks { get; set; }
        public DbSet<RelTaskWordEntity> RelWordTasks { get; set; }
        public DbSet<AssignedWordTaskEntity> AssignedWordTasks { get; set; }
        public DbSet<RelAnswerWordEntity> RelAnsweredWords { get; set; }
        public DbSet<WordAnswerEntity> WordAnswers { get; set; }
        public DbSet<VerbAnswerEntity> VerbAnswers { get; set; }
        public DbSet<RelAnsweredVerbEntity> RelAnswerVerb { get; set; }
        public DbSet<AssignedVerbTaskEntity> AssignedVerbTasks { get; set; }
        public DbSet<RelVerbTaskEntity> RelVerbTasks { get; set; }
        public DbSet<VerbTaskEntity> VerbTasks { get; set; }

        public DbSet<SentenceEntity> Sentences { get; set; }
        public DbSet<SentenceTranslationEntity> SentenceTranslations { get; set; }
        public DbSet<RelSentenceTaskEntity> RelSentenceTasks { get; set; }
        public DbSet<SentenceTaskEntity> SentenceTasks { get; set; }
        public DbSet<AssignedSentenceTaskEntity> AssignedSentenceTasks { get; set; }
        public DbSet<RelAnswerSentenceEntity> RelAnsweredSentences { get; set; }
        public DbSet<SentenceAnswerEntity> SentenceAnswers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new UserConfigurator());
            modelBuilder.ApplyConfiguration(new UserProfileConfigurator());

            modelBuilder.ApplyConfiguration(new WordConfigurator());
            modelBuilder.ApplyConfiguration(new VerbConfigurator());
            modelBuilder.ApplyConfiguration(new VerbWordConfigurator());
            modelBuilder.ApplyConfiguration(new WordTaskConfigurator());
            modelBuilder.ApplyConfiguration(new TaskWordConfigurator());
            modelBuilder.ApplyConfiguration(new AssignedWordTaskConfigurator());
            modelBuilder.ApplyConfiguration(new AnsweredWordConfigurator());
            modelBuilder.ApplyConfiguration(new WordAnswerConfigurator());

            modelBuilder.ApplyConfiguration(new AnsweredVerbConfigurator());
            modelBuilder.ApplyConfiguration(new VerbAnswerConfigurator());
            modelBuilder.ApplyConfiguration(new AssignedVerbTaskConfigurator());
            modelBuilder.ApplyConfiguration(new VerbTaskConfigurator());
            modelBuilder.ApplyConfiguration(new RelVerbTaskConfigurator());

            modelBuilder.ApplyConfiguration(new SentenceConfigurator());
            modelBuilder.ApplyConfiguration(new SentenceTranslationConfigurator());
            modelBuilder.ApplyConfiguration(new RelSentenceTaskConfigurator());
            modelBuilder.ApplyConfiguration(new SentenceTaskConfigurator());
            modelBuilder.ApplyConfiguration(new AssignedSentenceTaskConfigurator());
            modelBuilder.ApplyConfiguration(new SentenceAnswerConfigurator());
            modelBuilder.ApplyConfiguration(new RelAnsweredSentenceConfigurator());
        }
    }
}
