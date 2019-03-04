namespace DAL.Entities
{
    public abstract class BaseVersionEntity
    {
        public byte[] RowVersion { get; set; }
    }
}
