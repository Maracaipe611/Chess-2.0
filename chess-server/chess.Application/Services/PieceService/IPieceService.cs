using System.Collections.Generic;
using chess.Domain.Entities;

namespace chess.Application.Services.PieceService
{
    public interface IPieceService
    {
        IEnumerable<Piece> BuildAllPieces(IEnumerable<Square> squares);
    }
}
