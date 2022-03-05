using System.Collections.Generic;
using static chess.API.Models.Colors;

namespace chess.API.Models
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
