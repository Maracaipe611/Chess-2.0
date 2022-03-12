using chess.Domain.Entities;
using System.Collections.Generic;

namespace chess.Application.Services.MoveService
{
    public interface IMoveService
    {
        IList<Move> BuildMoves(Types type);
    }
}
