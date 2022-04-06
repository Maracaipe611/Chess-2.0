namespace chess.Domain.Entities
{
    public class Move
    {
        public Move(int alpha, int index, MovesDirections direction, int multiplier = 1)
        {
            Coordinate = new Coordinate(
                alpha * multiplier,
                index * multiplier);
            Direction = direction;
        }
        public Coordinate Coordinate { get; set; }
        public MovesDirections Direction { get; set; }
    }
}
