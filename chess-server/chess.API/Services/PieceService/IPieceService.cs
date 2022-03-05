using System.Collections.Generic;
using chess.API.Models;

namespace chess.API.Services.PieceService
{
    public interface IPieceService
    {
        IList<Piece> BuildAllPieces();
    }
}
