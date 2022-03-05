using chess.API.Models;
using System.Collections.Generic;

namespace chess.API.Services.HouseService
{
    public interface IHouseService
    {
        IList<House> BuildAllHouses();
        IList<House> PossibleHousesToMove(Board board, Piece piece);
    }
}
