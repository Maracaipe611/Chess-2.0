namespace chess.API.Models
{
    public class Piece
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Types Type { get; set; }
        public Moves Moves { get; set; }
    }
    public class Types
    {
        string Pawn = "Pawn";
        string Tower = "Tower";
        string Horse = "Horse";
        string Bishop = "Bishop";
        string Queen = "Queen";
        string King = "King";
    }

    public class Moves
    {
    }
}
