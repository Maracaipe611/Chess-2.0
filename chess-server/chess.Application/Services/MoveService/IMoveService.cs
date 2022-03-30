using chess.Domain.Entities;
using System;
using System.Collections.Generic;

namespace chess.Application.Services.MoveService
{
    public interface IMoveService
    {
        IList<Move> BuildMoves(Types type);
        IList<String> BuildSquaresToMove(Types type, Coordinate coordinate, Colors color, IList<Square> squares, IList<Move> moves);
    }
}
