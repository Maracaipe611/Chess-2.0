using chess.Domain.Entities;
using System.Collections.Generic;

namespace chess.Application.Services.SquareService
{
    public interface ISquareService
    {
        IList<Square> BuildAllSquares();
        IList<Square> PossibleSquaresToMove(Board board, Piece piece);
    }
}
