namespace chess.API.Models
{
    public class Directions
    {
        public enum PlayerDirections
        {
            forward = 1,
            backward = -1,
        }
        public enum PieceDirections
        {
            up = 1,
            down = -1,
            left = -1,
            right = 1
        }
        public enum MovesDirections
        {
            up,
            down,
            left,
            right,
            upRight,
            downRight,
            upLeft,
            downLeft,
        }
    }
}
