namespace chess.Domain.Entities
{
    public class Player
    {
        public Player(int id, string name, Colors color)
        {
            Id = id;
            Color = color;
            Name = name;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public Colors Color { get; set; }
    }
}
