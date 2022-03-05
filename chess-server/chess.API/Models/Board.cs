using System;
using System.Collections.Generic;

namespace chess.API.Models
{
    public class Board
    {
        public Board(List<House> houses)
        {
            Houses = houses;
        }
        public IList<House> Houses { get; set; }
    }
}
