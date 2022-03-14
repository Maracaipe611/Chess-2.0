using System;
using System.Collections.Generic;

namespace chess.Domain.Entities
{
    public class Board
    {
        public Board(List<Square> squares)
        {
            Id = Guid.NewGuid().ToString();
            Squares = squares;
        }
        public string Id { get; set; }
        public IList<Square> Squares { get; set; }
    }
}
