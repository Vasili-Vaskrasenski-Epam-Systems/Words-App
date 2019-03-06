namespace Entities.Instances.Base
{
    public abstract class BaseVersionEntity
    {
        public byte[] RowVersion { get; set; }
    }
}
