using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Infrastructure
{
    internal abstract class VersionEntityConfigurator<T>: IEntityTypeConfiguration<T> where T: BaseVersionEntity
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder.Property(e => e.RowVersion).IsRowVersion();
        }
    }

    internal class VerbWordConfigurator : VersionEntityConfigurator<WordVerbEntity>
    {
        public override void Configure(EntityTypeBuilder<WordVerbEntity> builder)
        {
            base.Configure(builder);
            builder.Property(e => e.RowVersion).IsRowVersion();
            builder.HasKey(wv => new {wv.VerbId, wv.WordId});
        }
    }
}
