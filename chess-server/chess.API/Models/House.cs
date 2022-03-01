using System.Collections.Generic;
using static chess.API.Models.Colors;

namespace chess.API.Models
{
    public class House
    {
        public House(Coordinate coordinate, ColorsType color, Piece piece = null)
        {
            Coordinate = coordinate;
            Piece = piece;
            Color = color;
        }
        public Coordinate Coordinate { get; set; }
        #nullable enable
        public Piece? Piece { get; set; }
        public ColorsType Color { get; set; } 
    }

    public class HouseBuilder
    {
        public HouseBuilder() { }
        public List<House> buildAllHouses()
        {
            int[] indexes = { 1, 2, 3, 4, 5, 6, 7, 8 };
            int[] alphs = { 1, 2, 3, 4, 5, 6, 7, 8 };

            var allHouses = new List<House>();
            foreach (var alph in alphs)
            {
                foreach (var index in indexes)
                {
                    var color = (alph + index) % 2 == 0 ? ColorsType.Black : ColorsType.White;
                    var coordinate = new Coordinate(alph, index);
                    allHouses.Add(new House(coordinate, color));
                }
            }
            return allHouses;
        }
    }
}
