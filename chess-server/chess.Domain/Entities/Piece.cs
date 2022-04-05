using System;
using System.Collections.Generic;
using System.Linq;

namespace chess.Domain.Entities
{
    public class Piece
    {
        public Piece(Types type, Colors color, Coordinate coordinate, IList<PossibleSquareToMove> possiblesSquaresToMove)
        {
            Id = type.ToString() + coordinate.Alpha.ToString() + coordinate.Index.ToString();
            Type = type;
            PossiblesSquaresToMove = possiblesSquaresToMove ?? new List<PossibleSquareToMove>();
            Color = color;
            Coordinate = coordinate;
            HasMovedBefore = false;
        }
        public string Id { get; set; }
        public Types Type { get; set; }
        public Colors Color { get; set; }
        public IList<PossibleSquareToMove> PossiblesSquaresToMove { get; set; }
        public Coordinate Coordinate { get; set; }
        public bool HasMovedBefore { get; set; }
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
