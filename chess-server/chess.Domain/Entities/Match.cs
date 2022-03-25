using System;
using System.Collections.Generic;

namespace chess.Domain.Entities
{
    public class Match
    {
        public Match(string reference, IList<Player> players, IList<Square> board)
        {
            Board = board;
            Players = players;
            Reference = reference;
            Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
        public IList<Player> Players { get; set; }
        public IList<Square> Board { get; set; }
        public string Reference { get; set; }
        public IList<Piece> History { get; set; }

        internal void AddHistory(Piece piece)
        {
            History.Add(piece);
        }
    }
}
