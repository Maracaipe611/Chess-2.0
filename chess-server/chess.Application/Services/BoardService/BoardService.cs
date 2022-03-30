using chess.Domain.Entities;
using chess.Application.Services.SquareService;
using chess.Application.Services.PieceService;
using System.Linq;
using System.Collections.Generic;
using chess.Application.Services.MatchService;
using chess.Application.Facades.MatchFacade;

namespace chess.Application.Services.BoardService
{
    public class BoardService : IBoardService
    {
        private readonly ISquareService squareService;
        private readonly IPieceService pieceService;
        private readonly IMatchFacade matchFacade;

        public BoardService(ISquareService squareService, IPieceService pieceService, IMatchFacade matchFacade)
        {
            this.squareService = squareService;
            this.pieceService = pieceService;
            this.matchFacade = matchFacade;
        }
        public IEnumerable<Square> BuildBoard()
        {
            var Squares = squareService.BuildAllSquares().ToList();
            var Pieces = pieceService.BuildAllPieces(Squares).ToList();
            foreach (var square in Squares)
            {
                square.Piece = Pieces.Find(piece => piece.Coordinate.Equals(square.Coordinate));
            }
            var Board = matchFacade.ValidateMoves(Squares);
            return Board;
        }
    }
}
