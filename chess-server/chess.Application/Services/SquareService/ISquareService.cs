using chess.Domain.Entities;
using System.Collections.Generic;

namespace chess.Application.Services.SquareService
{
    public interface ISquareService
    {
        IEnumerable<Square> BuildAllSquares();
        IEnumerable<Square> PossibleSquaresToMove(List<Square> board, Piece piece);
    }
}
