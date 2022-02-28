namespace chess.API.Models
{
    public class House
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Alpha { get; set; }
        public int Index { get; set; }
        public Piece? Piece { get; set; }
    }
}
