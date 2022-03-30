using System.Collections.Generic;
using chess.Domain.Entities;

namespace chess.Application.Services.PieceService
{
    public interface IPieceService
    {
        IList<Piece> BuildAllPieces(IList<Square> squares);
    }
}
