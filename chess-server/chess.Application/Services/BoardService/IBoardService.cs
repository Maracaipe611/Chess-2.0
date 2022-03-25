using chess.Domain.Entities;
using System.Collections.Generic;

namespace chess.Application.Services.BoardService
{
    public interface IBoardService
    {
        IList<Square> BuildBoard();
    }
}
