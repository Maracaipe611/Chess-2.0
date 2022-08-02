using System;

namespace chess.Domain.Entities
{
    public class Player
    {
        public Player(string name, Colors color)
        {
            Id = Guid.NewGuid().ToString();
            Color = color;
            Name = name;
        }
        public string Id { get; set; }
        public string Name { get; set; }
        #nullable enable
        public Colors Color { get; set; }
    }
}
