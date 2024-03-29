﻿using chess.Domain.Entities;
using System;
using System.Collections.Generic;

namespace chess.Application.Services.MoveService
{
    public interface IMoveService
    {
        IEnumerable<Move> BuildMoves(Types type);
        IList<PossibleSquareToMove> BuildSquaresToMove(Types type, Coordinate coordinate, Colors color, IEnumerable<Square> squares);
        IList<PossibleSquareToMove> BuildSquaresToMove(Piece piece, IEnumerable<Square> squares);
    }
}
