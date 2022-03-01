using System.Collections.Generic;
using static chess.API.Models.Directions;

namespace chess.API.Models
{
    public class Move
    {
        public Move(int alpha, int index, MovesDirections direction, int multiplier = 1)
        {
            Alpha = alpha * multiplier;
            Index = index * multiplier;
            Direction = direction;
        }
        public int Alpha { get; set; }
        public int Index { get; set; }
        public MovesDirections Direction { get; set; }
    }

    public class MovesBuilder
    {
        public MovesBuilder() { }
        public List<Move> buildPieceMoves(Types type)
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

        private List<Move> HorizontalAndVerticalMoves(int multiplier, bool doublefront = false)
        {
            var moves = new List<Move>();
            moves.Add(new Move(0, 1, MovesDirections.up, multiplier));
            moves.Add(new Move(0, -1, MovesDirections.down, multiplier));
            moves.Add(new Move(-1, 0, MovesDirections.left, multiplier));
            moves.Add(new Move(1, 0, MovesDirections.right, multiplier));
            return moves;
        }
        private List<Move> DiagonalMoves(int multiplier)
        {
            var moves = new List<Move>();
            moves.Add(new Move(-1, 1, MovesDirections.upLeft, multiplier));
            moves.Add(new Move(-1, -1, MovesDirections.downLeft, multiplier));
            moves.Add(new Move(1, 1, MovesDirections.upRight, multiplier));
            moves.Add(new Move(1, -1, MovesDirections.downRight, multiplier));
            return moves;
        }

        private List<Move> HorseMoves()
        {
            var moves = new List<Move>();

            moves.Add(new Move(-1, 2, MovesDirections.upLeft));
            moves.Add(new Move(2, 1, MovesDirections.upRight));
            moves.Add(new Move(1, 2, MovesDirections.upRight));
            moves.Add(new Move(-2, 1, MovesDirections.upLeft));
            moves.Add(new Move(-1, -2, MovesDirections.downLeft));
            moves.Add(new Move(-1, -2, MovesDirections.downLeft));
            moves.Add(new Move(1, -2, MovesDirections.downRight));
            moves.Add(new Move(2, -1, MovesDirections.downRight));
            return moves;
        }
    }
}
