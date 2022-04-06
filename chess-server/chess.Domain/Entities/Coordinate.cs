namespace chess.Domain.Entities
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

        public override bool Equals(object obj)
        {
            return (obj as Coordinate)?.Alpha == Alpha && (obj as Coordinate)?.Index == Index;
        }
    }
}
