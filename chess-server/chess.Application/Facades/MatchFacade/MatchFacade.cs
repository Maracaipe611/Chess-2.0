using chess.Application.Services.BoardService;
using chess.Application.Services.MatchService;
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
        public MatchFacade(IMatchService matchService, IBoardService boardService)
        {
            this.matchService = matchService;
            this.boardService = boardService;
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

        public Match Update(MatchDTO matchDTO)
        {
            return matchService.Update(matchDTO);
        }

        public IEnumerable<Square> ValidateMoves(IEnumerable<Square> squares)
        {
            return boardService.ValidateMoves(squares);
        }
    }
}
