using System.Collections.Generic;
using chess.Domain.Entities;

namespace chess.API.Services.PieceService
{
    public interface IPieceService
    {
        IList<Piece> BuildAllPieces();
    }
}
