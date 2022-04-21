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
            var board = squareService.BuildAllSquares().ToList();
            var pieces = pieceService.BuildAllPieces(board).ToList();
            foreach (var square in board)
            {
                square.Piece = pieces.Find(piece => piece.Coordinate.Equals(square.Coordinate));
            }
            return board;
        }
        public IEnumerable<Square> ValidateMoves(IEnumerable<Square> board)
        {
            //King must be the last to validate, cause some piece get new possible moves on validate
            this.board = board.OrderBy(square => square.Piece is not null && square.Piece.Type is Types.King).ToList();

            foreach (var square in this.board)
            {
                if (square.Piece is null) continue;
                var piece = square.Piece;
                bool isInDefaultPosition = DefaultIndexPositions(piece.Type, piece.Color) == piece.Coordinate.Index;
                bool hasMovedBefore = !isInDefaultPosition && !piece.HasMovedBefore;

                RemovePossibleSquaresNotAbleToMove(piece);

                //check if this piece is protecting the king, if yes, this piece cant move

                switch (piece.Type)
                {
                    case Types.Pawn:
                        {
                            if (!hasMovedBefore)
                            {
                                AddLongMove(piece);
                            }

                            AddPossiblesSquaresToEatDiagonally(board, piece);
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
                        RemoveDangerousSquaresToMove(this.board.Where(square => square.Piece is not null).Select(square => square.Piece), piece);
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

        private void AddLongMove(Piece piece)
        {
            int direction = piece.Color == Colors.Black ? -1 : 1;
            var longestSquareCoordinate = new Coordinate(piece.Coordinate.Alpha, piece.Coordinate.Index + (2 * direction));
            var longestSquare = board.Find(square => square.Coordinate.Equals(longestSquareCoordinate));

            if (longestSquare != null)
            {
                piece.PossiblesSquaresToMove.Add(new PossibleSquareToMove()
                {
                    Id = longestSquare.Id,
                    Direction = direction == 1 ? MovesDirections.up : MovesDirections.down
                });
            }
            
        }

        private void RemovePossibleSquaresNotAbleToMove(Piece piece)
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

                var possibleSquare = board.Where(square => square.Id.Equals(possibleSquareToMove.Id)).SingleOrDefault();
                bool possibleSquareHasAnyPiece = possibleSquare.Piece != null;
                bool thisPossiblePieceIsNotMine = possibleSquareHasAnyPiece && possibleSquare.Piece.Color != piece.Color;
                if (thisPossiblePieceIsNotMine)
                {
                    //when some piece is nearly to a enemy piece, this some piece still can move to enemy piece, but cannot move to this direction anymore
                    unableDirections.Add(possibleSquareToMove.Direction);
                    continue;
                }
                else if (possibleSquareHasAnyPiece)
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
                    piece.PossiblesSquaresToMove = piece.PossiblesSquaresToMove.Where(pq => !pq.Equals(impossibleSquareToMove)).ToList();
                }
            }
        }

        private static void RemoveDangerousSquaresToMove(IEnumerable<Piece> allPieces, Piece piece)
        {
            var enemyPieces = allPieces.Where(singlePiece => singlePiece.Color != piece.Color);
            var enemyPossibleSquares = enemyPieces.SelectMany(singlePiece => singlePiece.PossiblesSquaresToMove);
            foreach (var myPossibility in piece.PossiblesSquaresToMove.ToList())
            {
                if (enemyPossibleSquares.Where(enemyPossibility => enemyPossibility.Id == myPossibility.Id).Any())
                {
                    piece.PossiblesSquaresToMove.Remove(myPossibility);
                }
            }
        }

        private static void AddPossiblesSquaresToEatDiagonally(IEnumerable<Square> board, Piece piece)
        {
            int direction = piece.Color == Colors.Black ? -1 : 1;
            var rightDiagonalCoordinate = new Coordinate(piece.Coordinate.Alpha + 1, piece.Coordinate.Index + direction);
            var leftDiagonalCoordinate = new Coordinate(piece.Coordinate.Alpha - 1, piece.Coordinate.Index + direction);

            var rightDiagonalSquare = board.Where(square =>
            square.Coordinate.Equals(rightDiagonalCoordinate)
            && square.Piece != null
            ).SingleOrDefault();
            var leftDiagonalSquare = board.Where(square =>
            square.Coordinate.Equals(leftDiagonalCoordinate)
            && square.Piece != null
            ).SingleOrDefault();

            if (rightDiagonalSquare != null && rightDiagonalSquare.Piece.Color != piece.Color)
            {
                piece.PossiblesSquaresToMove.Add(new PossibleSquareToMove()
                {
                    Id = rightDiagonalSquare.Id,
                    Direction = direction == 1 ? MovesDirections.upRight : MovesDirections.downRight
                });
            }

            if (leftDiagonalSquare != null && leftDiagonalSquare.Piece.Color != piece.Color)
            {
                piece.PossiblesSquaresToMove.Add(new PossibleSquareToMove()
                {
                    Id = leftDiagonalSquare.Id,
                    Direction = direction == 1 ? MovesDirections.upLeft : MovesDirections.downLeft
                });
            }
        }

        #endregion
    }
}
