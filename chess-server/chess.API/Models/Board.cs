using System;
using System.Collections.Generic;

namespace chess.API.Models
{
    public class Board
    {
        public Board()
        {
            Id = Guid.NewGuid().ToString();
            Houses = buildBoard();
        }
        public string Id { get; set; }
        public IList<House> Houses { get; set; }

        private List<House> buildBoard()
        {
            var Houses = new HouseBuilder().buildAllHouses();
            var Pieces = new PieceBuilder().buildAllPieces();
            foreach (var house in Houses)
            {
                house.Piece = Pieces.Find(piece => piece.Coordinate.Alpha == house.Coordinate.Alpha && piece.Coordinate.Index == house.Coordinate.Index);
            }
            return Houses;
        }
    }
}
