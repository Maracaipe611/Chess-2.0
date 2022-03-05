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
}
