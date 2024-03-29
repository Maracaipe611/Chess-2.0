﻿using chess.Domain.Entities;
using System.Collections.Generic;

namespace chess.Application.Services.BoardService
{
    public interface IBoardService
    {
        IEnumerable<Square> BuildBoard();
        IEnumerable<Square> ValidateMoves(IEnumerable<Square> squares);
    }
}
