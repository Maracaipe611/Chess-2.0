using System.Collections.Generic;
using chess.Domain.Entities;

namespace chess.Domain.Entities
{
    public class House
    {
        public House(Coordinate coordinate, Colors color, Piece piece = null)
        {
            Coordinate = coordinate;
            Piece = piece;
            Color = color;
        }
        public Coordinate Coordinate { get; set; }
        #nullable enable
        public Piece? Piece { get; set; }
        public Colors Color { get; set; } 
    }
}
