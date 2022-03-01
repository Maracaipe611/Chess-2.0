namespace chess.API.Models
{
    public class Coordinate
    {
        public Coordinate(int alpha, int index)
        {
            Alpha = alpha;
            Index = index;
        }
        public int Alpha { get; set; }
        public int Index { get; set; }
    }
}
