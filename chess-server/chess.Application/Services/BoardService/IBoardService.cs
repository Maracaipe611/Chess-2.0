using chess.Domain.Entities;

namespace chess.Application.Services.BoardService
{
    public interface IBoardService
    {
        Board BuildBoard();
    }
}
