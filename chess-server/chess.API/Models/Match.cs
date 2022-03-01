﻿using System;
using System.Collections.Generic;

namespace chess.API.Models
{
    public class Match
    {
        public Match(string reference, IList<Player> players, Board board = null)
        {
            Board = board;
            Players = players;
            Reference = reference;
            Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
        public IList<Player> Players { get; set; }
        public Board Board { get; set; }
        public string Reference { get; set; }
    }
}