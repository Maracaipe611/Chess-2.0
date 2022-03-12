using chess.Domain.Entities;
using chess.Application.Services.HouseService;
using chess.Application.Services.PieceService;
using System.Linq;

namespace chess.Application.Services.BoardService
{
    public class BoardService : IBoardService
    {
        private readonly IHouseService houseService;
        private readonly IPieceService pieceService;

        public BoardService(IHouseService houseService, IPieceService pieceService)
        {
            this.houseService = houseService;
            this.pieceService = pieceService;
        }
        public Board BuildBoard()
        {
            var Houses = houseService.BuildAllHouses().ToList();
            var Pieces = pieceService.BuildAllPieces().ToList();
            foreach (var house in Houses)
            {
                house.Piece = Pieces.Find(piece => piece.Coordinate.Alpha == house.Coordinate.Alpha && piece.Coordinate.Index == house.Coordinate.Index);
            }
            return new Board(Houses);
        }
    }
}
