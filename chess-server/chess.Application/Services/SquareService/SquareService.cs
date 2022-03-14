using chess.Domain.Entities;
using System.Collections.Generic;

namespace chess.Application.Services.SquareService
{
    public class SquareService : ISquareService
    {
        public IList<Square> BuildAllSquares()
        {
            int[] indexes = { 1, 2, 3, 4, 5, 6, 7, 8 };
            int[] alphs = { 1, 2, 3, 4, 5, 6, 7, 8 };

            var allSquares = new List<Square>();
            foreach (var alph in alphs)
            {
                foreach (var index in indexes)
                {
                    var color = (alph + index) % 2 == 0 ? Colors.Black : Colors.White;
                    var coordinate = new Coordinate(alph, index);
                    allSquares.Add(new Square(coordinate, color));
                }
            }
            return allSquares;
        }

        public IList<Square> PossibleSquaresToMove(Board board, Piece piece)
        {
            throw new System.NotImplementedException();
        }
    }
}
