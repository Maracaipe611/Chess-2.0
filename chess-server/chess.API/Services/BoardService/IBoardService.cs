using chess.Domain.Entities;

namespace chess.API.Services.BoardService
{
    public interface IBoardService
    {
        Board BuildBoard();
    }
}
