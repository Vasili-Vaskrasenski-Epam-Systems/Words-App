using DAL.Entities;
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
}
