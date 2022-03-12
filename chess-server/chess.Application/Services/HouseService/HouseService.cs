using chess.Domain.Entities;
using System.Collections.Generic;

namespace chess.Application.Services.HouseService
{
    public class HouseService : IHouseService
    {
        public IList<House> BuildAllHouses()
        {
            int[] indexes = { 1, 2, 3, 4, 5, 6, 7, 8 };
            int[] alphs = { 1, 2, 3, 4, 5, 6, 7, 8 };

            var allHouses = new List<House>();
            foreach (var alph in alphs)
            {
                foreach (var index in indexes)
                {
                    var color = (alph + index) % 2 == 0 ? Colors.Black : Colors.White;
                    var coordinate = new Coordinate(alph, index);
                    allHouses.Add(new House(coordinate, color));
                }
            }
            return allHouses;
        }

        public IList<House> PossibleHousesToMove(Board board, Piece piece)
        {
            throw new System.NotImplementedException();
        }
    }
}
