using Entities.Instances.Base;
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
}
