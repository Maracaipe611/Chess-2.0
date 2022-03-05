using System;
using System.Collections.Generic;

namespace chess.API.Models
{
    public class Piece
    {
        public Piece(Types type, IList<Move> moves, Colors color, Coordinate coordinate)
        {
            Type = type;
            Move = moves;
            Color = color;
            Coordinate = coordinate;
        }
        public Types Type { get; set; }
        public Colors Color { get; set; }
        public IList<Move> Move { get; set; }
        public Coordinate Coordinate { get; set; }
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
