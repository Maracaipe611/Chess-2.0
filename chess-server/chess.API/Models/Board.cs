using System.Collections.Generic;

namespace chess.API.Models
{
    public class Board
    {
        public int Id { get; set; }
        public IList<House> Houses { get; set; }
    }
}
