using System;
using System.Collections.Generic;
using System.Linq;

namespace chess.Domain.Entities
{
    public class Match
    {
        public Match(string reference, IEnumerable<Player> players, IEnumerable<Square> board)
        {
            Board = board;
            Players = players;
            Reference = reference;
            Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
        public IEnumerable<Player> Players { get; set; }
        public IEnumerable<Square> Board { get; set; }
        public string Reference { get; set; }
        public IEnumerable<Piece> History { get; set; }
    }
}
