using chess.Domain.Entities;
using System.Collections.Generic;

namespace chess.API.Services.MoveService
{
    public class MoveService : IMoveService
    {
        public IList<Move> BuildMoves(Types type)
        {
            var moves = new List<Move>();
            var multiplier = 7;
            switch (type)
            {
                case Types.Pawn:
                    {
                        multiplier = 1;
                        moves.Add(new Move(0, 1, MovesDirections.up, multiplier));
                        moves.Add(new Move(0, 2, MovesDirections.up, multiplier));
                        break;
                    }

                case Types.Tower:
                    {
                        for (int i = 0; i <= multiplier; i++)
                        {
                            moves.AddRange(HorizontalAndVerticalMoves(i));
                        }
                        break;
                    }
                case Types.Horse:
                    {
                        moves.AddRange(HorseMoves());
                        break;
                    }
                case Types.Bishop:
                    {
                        for (int i = 0; i <= multiplier; i++)
                        {
                            moves.AddRange(DiagonalMoves(i));
                        }
                        break;
                    }
                case Types.Queen:
                    {
                        for (int i = 0; i <= multiplier; i++)
                        {
                            moves.AddRange(HorizontalAndVerticalMoves(i));
                            moves.AddRange(HorizontalAndVerticalMoves(i));
                        }
                        break;
                    }
                case Types.King:
                    {
                        multiplier = 1;
                        moves.AddRange(HorizontalAndVerticalMoves(multiplier));
                        moves.AddRange(HorizontalAndVerticalMoves(multiplier));
                        break;
                    }
                default: return moves;
            }
            return moves;
        }

        #region Private
        private static List<Move> HorizontalAndVerticalMoves(int multiplier, bool doublefront = false)
        {
            var moves = new List<Move>
            {
                new Move(0, 1, MovesDirections.up, multiplier),
                new Move(0, -1, MovesDirections.down, multiplier),
                new Move(-1, 0, MovesDirections.left, multiplier),
                new Move(1, 0, MovesDirections.right, multiplier)
            };
            return moves;
        }
        private static List<Move> DiagonalMoves(int multiplier)
        {
            var moves = new List<Move>
            {
                new Move(-1, 1, MovesDirections.upLeft, multiplier),
                new Move(-1, -1, MovesDirections.downLeft, multiplier),
                new Move(1, 1, MovesDirections.upRight, multiplier),
                new Move(1, -1, MovesDirections.downRight, multiplier)
            };
            return moves;
        }

        private static List<Move> HorseMoves()
        {
            var moves = new List<Move>
            {
                new Move(-1, 2, MovesDirections.upLeft),
                new Move(2, 1, MovesDirections.upRight),
                new Move(1, 2, MovesDirections.upRight),
                new Move(-2, 1, MovesDirections.upLeft),
                new Move(-1, -2, MovesDirections.downLeft),
                new Move(-1, -2, MovesDirections.downLeft),
                new Move(1, -2, MovesDirections.downRight),
                new Move(2, -1, MovesDirections.downRight)
            };
            return moves;
        }
        #endregion
    }
}
