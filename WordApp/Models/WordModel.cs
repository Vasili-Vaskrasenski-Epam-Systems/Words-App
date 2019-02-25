namespace WordApp.Models
{
    public class WordModel:BaseModel
    {
        public string Word { get; set; }
        public string Transcription { get; set; }
        public string Translation { get; set; }
    }
}
