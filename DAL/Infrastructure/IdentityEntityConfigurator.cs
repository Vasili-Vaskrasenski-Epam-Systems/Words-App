using Entities.Instances;
using Entities.Instances.Base;
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
        }
    }

    internal class IrregularVerbConfigurator : IdentityEntityConfigurator<IrregularVerbEntity>
    {
        public override void Configure(EntityTypeBuilder<IrregularVerbEntity> builder)
        {
            base.Configure(builder);

            builder.HasMany(e => e.WordVerbs)
                .WithOne(ee => ee.Verb)
                .HasForeignKey(ee => ee.VerbId);
        }
    }

    internal class TaskConfigurator : IdentityEntityConfigurator<TaskEntity>
    {
        public override void Configure(EntityTypeBuilder<TaskEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.TaskWords)
                .WithOne(tw => tw.Task)
                .HasForeignKey(tw => tw.TaskId);

            builder.HasMany(e => e.AssignedTasks)
                .WithOne(ee => ee.Task)
                .HasForeignKey(ee => ee.TaskId);
        }
    }

    internal class UserConfigurator : VersionEntityConfigurator<UserEntity>
    {
        public override void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.AssignedTasks)
                .WithOne(ee => ee.User)
                .HasForeignKey(ee => ee.UserId);
        }
    }

    #region relational entities
    internal class VerbWordConfigurator : VersionEntityConfigurator<WordVerbEntity>
    {

    }

    internal class TaskWordConfigurator : VersionEntityConfigurator<TaskWordEntity>
    {

    }

    internal class AssignedTaskConfigurator : VersionEntityConfigurator<AssignedTaskEntity>
    {

    }
    #endregion
}
