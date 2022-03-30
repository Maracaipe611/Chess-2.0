using System.Collections.Generic;

namespace chess.Domain.Entities
{
    public class Piece
    {
        public Piece(Types type, IList<Move> moves, Colors color, Coordinate coordinate)
        {
            Id = type.ToString() + coordinate.Alpha.ToString() + coordinate.Index.ToString();
            Type = type;
            Move = moves;
            Color = color;
            Coordinate = coordinate;
            hasMovedBefore = false;
        }
        public string Id { get; set; }
        public Types Type { get; set; }
        public Colors Color { get; set; }
        public IList<Move> Move { get; set; }
        public Coordinate Coordinate { get; set; }
        public bool hasMovedBefore { get; set; }
    }
    public enum Types
    {
        Pawn,
        Tower,
        Horse,
        Bishop,
        Queen,
        King,
    }
}
