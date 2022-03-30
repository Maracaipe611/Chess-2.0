using System.Collections.Generic;
using chess.Domain.Entities;

namespace chess.Domain.Entities
{
    public class Square
    {
        public Square(Coordinate coordinate, Colors color, Piece piece = null)
        {
            Id = coordinate.Alpha.ToString() + coordinate.Index.ToString();
            Coordinate = coordinate;
            Piece = piece;
            Color = color;
        }
        public string Id { get; set; }
        public Coordinate Coordinate { get; set; }
        #nullable enable
        public Piece? Piece { get; set; }
        public Colors Color { get; set; } 
    }
}
