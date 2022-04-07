namespace chess.Domain.Entities.DTO
{
    public class PlayerDTO
    {
        public string Name { get; set; }
        #nullable enable
        public Colors? Color { get; set; }
    }
}
