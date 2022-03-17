using System;
using System.Collections.Generic;

namespace chess.Domain.Entities
{
    public class Board
    {
        public Board(List<Square> squares)
        {
            Squares = squares;
        }
        public IList<Square> Squares { get; set; }
    }
}
