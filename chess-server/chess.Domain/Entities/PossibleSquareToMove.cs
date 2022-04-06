namespace chess.Domain.Entities
{
  public class PossibleSquareToMove
  {
    public string Id { get; set; }
    public MovesDirections Direction { get; set; }
  }
}