﻿using chess.Domain.Entities;
using System;
using System.Collections.Generic;

namespace chess.Application.Services.MoveService
{
    public interface IMoveService
    {
        IEnumerable<Move> BuildMoves(Types type);
        IEnumerable<PossibleSquareToMove> BuildSquaresToMove(Types type, Coordinate coordinate, Colors color, IEnumerable<Square> squares, IEnumerable<Move> moves);
    }
}
