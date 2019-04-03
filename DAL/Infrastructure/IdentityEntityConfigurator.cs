using Entities.Instances;
using Entities.Instances.Base;
using Entities.Instances.Sentence;
using Entities.Instances.Task.SentenceTask;
using Entities.Instances.Task.VerbTask;
using Entities.Instances.Task.WordTask;
using Entities.Instances.User;
using Entities.Instances.Verb;
using Entities.Instances.Word;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Infrastructure
{
    internal class IdentityEntityConfigurator<T> : VersionEntityConfigurator<T> where T : BaseEntity
    {
        public override void Configure(EntityTypeBuilder<T> builder)
        {
            base.Configure(builder);
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
        }
    }

    #region Words
    internal class WordConfigurator : IdentityEntityConfigurator<WordEntity>
    {
        public override void Configure(EntityTypeBuilder<WordEntity> builder)
        {
            base.Configure(builder);

            builder.HasMany(e => e.WordVerbEntities)
                .WithOne(ee => ee.Word)
                .HasForeignKey(ee => ee.WordId);

            builder.HasMany(e => e.TaskWords)
                .WithOne(ee => ee.Word)
                .HasForeignKey(ee => ee.WordId);

            builder.HasMany(e => e.AnsweredWord)
                .WithOne(ee => ee.Word)
                .HasForeignKey(ee => ee.WordId);
        }
    }
    #endregion

    #region Verbs
    internal class VerbConfigurator : IdentityEntityConfigurator<VerbEntity>
    {
        public override void Configure(EntityTypeBuilder<VerbEntity> builder)
        {
            base.Configure(builder);

            builder.HasMany(e => e.WordVerbs)
                .WithOne(ee => ee.Verb)
                .HasForeignKey(ee => ee.VerbId);
        }
    }
    #endregion
    internal class WordTaskConfigurator : IdentityEntityConfigurator<WordTaskEntity>
    {
        public override void Configure(EntityTypeBuilder<WordTaskEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.TaskWords)
                .WithOne(tw => tw.WordTask)
                .HasForeignKey(tw => tw.TaskId);

            builder.HasMany(e => e.AssignedWordTasks)
                .WithOne(ee => ee.WordTask)
                .HasForeignKey(ee => ee.WordTaskId);
        }
    }

    #region Users
    internal class UserConfigurator : IdentityEntityConfigurator<UserEntity>
    {
        public override void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.AssignedTasks)
                .WithOne(ee => ee.User)
                .HasForeignKey(ee => ee.UserId);

            builder.HasMany(e => e.Credentials)
                .WithOne(ee => ee.User)
                .HasForeignKey(ee => ee.UserId);

            builder.HasOne(e => e.UserProfile)
                .WithOne(ee => ee.User).HasForeignKey<UserEntity>(ee => ee.Id);

            builder.Property(e => e.Email).IsRequired();
            builder.HasIndex(e => e.Name).IsUnique();
            builder.HasIndex(e => e.Email).IsUnique();

            builder.HasOne(e => e.ApplicationUser)
                .WithOne(ee => ee.User)
                .HasForeignKey<UserEntity>(ee => ee.ApplicationUserId);
        }
    }

    internal class UserProfileConfigurator: VersionEntityConfigurator<UserProfileEntity> { }

    internal class UserCredentialsConfigurator : IdentityEntityConfigurator<UserCredentialsEntity> { }
    #endregion

    internal class WordAnswerConfigurator : IdentityEntityConfigurator<WordAnswerEntity>
    {
        public override void Configure(EntityTypeBuilder<WordAnswerEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.AnsweredWords)
                .WithOne(ee => ee.Answer)
                .HasForeignKey(ee => ee.AnswerId);
        }
    }

    internal class VerbTaskConfigurator : IdentityEntityConfigurator<VerbTaskEntity>
    {
        public override void Configure(EntityTypeBuilder<VerbTaskEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.TaskVerbs)
                .WithOne(ee => ee.TaskVerb)
                .HasForeignKey(ee => ee.TaskVerbId);

            builder.HasMany(e => e.AssignedVerbs)
                .WithOne(ee => ee.VerbTask)
                .HasForeignKey(ee => ee.VerbTaskId);
        }
    }

    internal class VerbAnswerConfigurator : IdentityEntityConfigurator<VerbAnswerEntity>
    {
        public override void Configure(EntityTypeBuilder<VerbAnswerEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.AnsweredVerbs)
                .WithOne(ee => ee.Answer)
                .HasForeignKey(ee => ee.AnswerId);
        }
    }

    internal class SentenceConfigurator : IdentityEntityConfigurator<SentenceEntity>
    {
        public override void Configure(EntityTypeBuilder<SentenceEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.Translations)
                .WithOne(ee => ee.Sentence)
                .HasForeignKey(ee => ee.SentenceId);

            builder.HasMany(e => e.SentenceTasks)
                .WithOne(ee => ee.Sentence)
                .HasForeignKey(ee => ee.SentenceId);

            builder.HasMany(e => e.AnsweredSentences)
                .WithOne(ee => ee.Sentence)
                .HasForeignKey(ee => ee.SentenceId);
        }
    }

    internal class SentenceTranslationConfigurator : IdentityEntityConfigurator<SentenceTranslationEntity> { }

    internal class SentenceTaskConfigurator : IdentityEntityConfigurator<SentenceTaskEntity>
    {
        public override void Configure(EntityTypeBuilder<SentenceTaskEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.Sentences)
                .WithOne(ee => ee.Task)
                .HasForeignKey(ee => ee.TaskId);

            builder.HasMany(e => e.AssignedSentenceTasks)
                .WithOne(ee => ee.SentenceTask)
                .HasForeignKey(ee => ee.SentenceTaskId);
        }
    }

    internal class SentenceAnswerConfigurator : IdentityEntityConfigurator<SentenceAnswerEntity>
    {
        public override void Configure(EntityTypeBuilder<SentenceAnswerEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.AnsweredSentences)
                .WithOne(ee => ee.Answer)
                .HasForeignKey(ee => ee.SentenceAnswerId);
        }
    }
    #region Relational entities
    internal class VerbWordConfigurator : IdentityEntityConfigurator<RelWordVerbEntity>
    {

    }

    internal class TaskWordConfigurator : IdentityEntityConfigurator<RelTaskWordEntity>
    {

    }

    internal class AssignedWordTaskConfigurator : IdentityEntityConfigurator<AssignedWordTaskEntity>
    {
        public override void Configure(EntityTypeBuilder<AssignedWordTaskEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.AnsweredWords)
                .WithOne(ee => ee.AssignedWordTask)
                .HasForeignKey(ee => ee.AssignedTaskId);
        }
    }

    internal class AnsweredWordConfigurator : IdentityEntityConfigurator<RelAnswerWordEntity> { }

    internal class AnsweredVerbConfigurator : IdentityEntityConfigurator<RelAnsweredVerbEntity> { }

    internal class AssignedVerbTaskConfigurator : IdentityEntityConfigurator<AssignedVerbTaskEntity>
    {
        public override void Configure(EntityTypeBuilder<AssignedVerbTaskEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.AnsweredVerbs)
                .WithOne(ee => ee.AssignedVerbTask)
                .HasForeignKey(ee => ee.AssignedVerbTaskId);
        }
    }

    internal class RelVerbTaskConfigurator : IdentityEntityConfigurator<RelVerbTaskEntity> { }

    internal class RelSentenceTaskConfigurator: IdentityEntityConfigurator<RelSentenceTaskEntity> { }

    internal class AssignedSentenceTaskConfigurator : IdentityEntityConfigurator<AssignedSentenceTaskEntity>
    {
        public override void Configure(EntityTypeBuilder<AssignedSentenceTaskEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.AnsweredSentences)
                .WithOne(ee => ee.AssignedSentenceTask)
                .HasForeignKey(ee => ee.AssignedSentenceTaskId);
        }
    }

    internal class RelAnsweredSentenceConfigurator: IdentityEntityConfigurator<RelAnswerSentenceEntity> { }
    #endregion
}
