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
        private List<Square> board;
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
            this.board = board.ToList();
            foreach (var square in board)
            {
                if (square.Piece is null) continue;
                var piece = square.Piece;
                bool isInDefaultPosition = DefaultIndexPositions(piece.Type, piece.Color) == piece.Coordinate.Index;
                bool hasMovedBefore = !isInDefaultPosition && !piece.HasMovedBefore;

                RemoveSquaresNotAbleToJump(piece);
                // RemoveSquareWithFriendPieces(piece);

                switch (piece.Type)
                {
                    case Types.Pawn:
                        {
                            if (hasMovedBefore)
                            {
                                RemoveLongMove(piece);
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

        private List<Square> GetSquaresById(IEnumerable<string> squaresIds)
        {
            List<Square> possiblesSquaresToMove = new List<Square>();

            foreach (var squareId in squaresIds)
            {
                possiblesSquaresToMove.AddRange(this.board.Where(square => square.Id.Equals(squareId)));
            }

            return possiblesSquaresToMove;
        }

        private void RemoveLongMove(Piece piece)
        {
            int direction = piece.Color == Colors.Black ? -1 : 1;
            var possibleSquaresToMove = GetSquaresById(piece.PossiblesSquaresToMove.Select(ps => ps.Id));
            var longgestSquare = possibleSquaresToMove.Where(square => square.Coordinate.Index > (piece.Coordinate.Index + 1 * direction)).SingleOrDefault();
            foreach (var possibleSquare in possibleSquaresToMove)
            {
                if (possibleSquare == longgestSquare)
                {
                    piece.PossiblesSquaresToMove = piece.PossiblesSquaresToMove.Where(pq => pq.Id != longgestSquare.Id);
                }
            }
        }

        private void RemoveSquareWithFriendPieces(Piece piece)
        {
            //select all squares that piece is not able to move
            var possibleSquaresToMove = GetSquaresById(piece.PossiblesSquaresToMove.Select(ps => ps.Id));
            var impossibleSquaresToMove = possibleSquaresToMove.Where(square => square.Piece is not null && square.Piece.Color == piece.Color).ToList();

            foreach (var impossibleSquare in impossibleSquaresToMove)
            {
                possibleSquaresToMove.Remove(impossibleSquare);
                if (piece.PossiblesSquaresToMove.Select(pq => pq.Id).Contains(impossibleSquare.Id))
                {
                    piece.PossiblesSquaresToMove = piece.PossiblesSquaresToMove.Where(pq => pq.Id != impossibleSquare.Id);
                }
            }
        }

        private void RemoveSquaresNotAbleToJump(Piece piece)
        {
            if (piece.Type == Types.Horse) return;
            List<PossibleSquareToMove> unablePossibilities = new List<PossibleSquareToMove>();
            List<MovesDirections> unableDirections = new List<MovesDirections>();
            
            foreach (var possibleSquareToMove in piece.PossiblesSquaresToMove)
            {
                bool thisDirectionIsAlreadyUnable = unableDirections.Contains(possibleSquareToMove.Direction);
                if (thisDirectionIsAlreadyUnable)
                {
                    unablePossibilities.Add(possibleSquareToMove);
                    continue;
                }

                bool possibleSquareHasAnyPiece = board.Where(square => square.Id.Equals(possibleSquareToMove.Id)).SingleOrDefault().Piece != null;
                if (possibleSquareHasAnyPiece)
                {
                    unableDirections.Add(possibleSquareToMove.Direction);
                    unablePossibilities.Add(possibleSquareToMove);
                    continue;
                }
            }

            foreach (var impossibleSquareToMove in unablePossibilities)
            {
                if (piece.PossiblesSquaresToMove.Contains(impossibleSquareToMove))
                {
                    piece.PossiblesSquaresToMove = piece.PossiblesSquaresToMove.Where(pq => !pq.Equals(impossibleSquareToMove));
                }
            }
        }

        #endregion
    }
}
