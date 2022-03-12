using System;
using System.Collections.Generic;

namespace chess.Domain.Entities
{
    public class Board
    {
        public Board(List<House> houses)
        {
            Id = Guid.NewGuid().ToString();
            Houses = houses;
        }
        public string Id { get; set; }
        public IList<House> Houses { get; set; }
    }
}
