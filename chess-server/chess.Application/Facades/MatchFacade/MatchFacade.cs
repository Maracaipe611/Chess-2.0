using chess.Application.Services.BoardService;
using chess.Application.Services.MatchService;
using chess.Application.Services.MoveService;
using chess.Domain.Entities;
using chess.Domain.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chess.Application.Facades.MatchFacade
{
    public class MatchFacade
    {
        private readonly IMatchService matchService;
        private readonly IBoardService boardService;
        private readonly IMoveService moveService;
        public MatchFacade(IMatchService matchService, IBoardService boardService, IMoveService moveService)
        {
            this.matchService = matchService;
            this.boardService = boardService;
            this.moveService = moveService;
        }
        public IEnumerable<Square> BuildBoard()
        {
            return boardService.BuildBoard();
        }

        public Match Create(MatchDTO matchDTO)
        {
            return matchService.Create(matchDTO);
        }

        public void Delete(string reference)
        {
            matchService.Delete(reference);
        }

        public IEnumerable<Match> GetAll()
        {
            return matchService.GetAll();
        }

        public Match GetByReference(string name)
        {
            return matchService.GetByReference(name);
        }

        public Match Update(Match match)
        {
            return matchService.Update(match);
        }

        public IEnumerable<Square> ValidateMoves(IEnumerable<Square> squares)
        {
            return boardService.ValidateMoves(squares);
        }

        public IEnumerable<Square> BuildPossiblesSquaresToMove(IEnumerable<Square> board)
        {
            foreach (var square in board)
            {
                if (square.Piece is null) continue;
                square.Piece.PossiblesSquaresToMove = moveService.BuildSquaresToMove(square.Piece, board);
            }
            return board;
        }
    }
}
