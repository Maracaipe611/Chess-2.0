using chess.Domain.Entities;
using chess.Application.Services.SquareService;
using chess.Application.Services.PieceService;
using System.Linq;

namespace chess.Application.Services.BoardService
{
    public class BoardService : IBoardService
    {
        private readonly ISquareService squareService;
        private readonly IPieceService pieceService;

        public BoardService(ISquareService squareService, IPieceService pieceService)
        {
            this.squareService = squareService;
            this.pieceService = pieceService;
        }
        public Board BuildBoard()
        {
            var Squares = squareService.BuildAllSquares().ToList();
            var Pieces = pieceService.BuildAllPieces().ToList();
            foreach (var square in Squares)
            {
                square.Piece = Pieces.Find(piece => piece.Coordinate.Equals(square.Coordinate));
            }
            return new Board(Squares);
        }
    }
}
