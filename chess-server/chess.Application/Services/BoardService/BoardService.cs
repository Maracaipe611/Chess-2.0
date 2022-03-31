using chess.Application.Services.PieceService;
using chess.Application.Services.SquareService;
using chess.Domain.Entities;
using System.Collections.Generic;
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
        public IEnumerable<Square> BuildBoard()
        {
            var Squares = squareService.BuildAllSquares().ToList();
            var Pieces = pieceService.BuildAllPieces(Squares).ToList();
            foreach (var square in Squares)
            {
                square.Piece = Pieces.Find(piece => piece.Coordinate.Equals(square.Coordinate));
            }
            return Squares;
        }
        public IEnumerable<Square> ValidateMoves(IEnumerable<Square> board)
        {
            foreach (var square in board)
            {
                if (square.Piece is null) continue;
                var piece = square.Piece;
                bool isInDefaultPosition = DefaultIndexPositions(piece.Type, piece.Color) == piece.Coordinate.Index;
                bool hasMovedBefore = !isInDefaultPosition && !piece.HasMovedBefore;
                List<Square> possiblesSquaresToMove = new List<Square>();

                foreach (var squareId in piece.SquaresToMove)
                {
                    possiblesSquaresToMove.AddRange(board.Where(square => square.Id.Equals(squareId.Key)));
                }

                RemoveSquareWithFriendPieces(piece, possiblesSquaresToMove);

                switch (piece.Type)
                {
                    case Types.Pawn:
                        {
                            if (hasMovedBefore)
                            {
                                RemoveLongMove(piece, possiblesSquaresToMove);
                            }
                        }
                        break;
                    case Types.Tower:
                        break;
                    case Types.Horse:
                        break;
                    case Types.Bishop:
                        break;
                    case Types.Queen:
                        break;
                    case Types.King:
                        break;
                }
                square.Piece = piece;
            }
            return board;
        }

        #region Private
        private static int DefaultIndexPositions(Types type, Colors color)
        {
            if (type == Types.Pawn)
            {
                return color == Colors.White ? 2 : 7;
            }

            return color == Colors.White ? 1 : 8;
        }

        private static void RemoveLongMove(Piece piece, IEnumerable<Square> possibleSquaresToMove)
        {
            int direction = piece.Color == Colors.Black ? -1 : 1;
            var longgestSquare = possibleSquaresToMove.Where(square => square.Coordinate.Index > (piece.Coordinate.Index + 1 * direction)).SingleOrDefault();
            foreach (var possibleSquare in possibleSquaresToMove)
            {
                if (possibleSquare == longgestSquare)
                {
                    piece.SquaresToMove.Remove(longgestSquare.Id);
                }
            }
        }

        private static void RemoveSquareWithFriendPieces(Piece piece, IList<Square> possibleSquaresToMove)
        {
            //select all squares that piece is not able to move
            var impossibleSquaresToMove = possibleSquaresToMove.Where(square => square.Piece is not null && square.Piece.Color == piece.Color).ToList();

            foreach (var impossibleSquare in impossibleSquaresToMove)
            {
                possibleSquaresToMove.Remove(impossibleSquare);
                if (piece.SquaresToMove.ContainsKey(impossibleSquare.Id))
                {
                    //if the dictionary contains some impossible square to move, then it will be removed
                    piece.SquaresToMove.Remove(impossibleSquare.Id);
                }
            }
        }

        //private static void RemoveSquaresNotAbleToJump(Piece piece)
        //{
        //    foreach (var direction in piece.)
        //    {

        //    }
        //}

        #endregion
    }
}
