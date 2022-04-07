using AutoMapper;
using chess.Domain.Entities;
using chess.Application.Services.BoardService;
using System.Collections.Generic;
using System.Linq;
using chess.Domain.Data.Repositories;
using chess.Domain.Entities.DTO;
using chess.Application.Facades.MatchFacade;

namespace chess.Application.Services.MatchService
{
    public class MatchService : IMatchService
    {
        private readonly IBoardService boardService;
        private readonly IMatchRepository matchRepository;
        private readonly IMapper mapper;
        public MatchService(IMatchRepository matchRepository, IMapper mapper, IBoardService boardService)
        {
            this.matchRepository = matchRepository;
            this.mapper = mapper;
            this.boardService = boardService;
        }
        public Match Create(MatchDTO matchDTO)
        {
            List<Square> board = boardService.BuildBoard().ToList();
            board = boardService.ValidateMoves(board).ToList();
            var players = mapper.Map<List<PlayerDTO>, List<Player>>(matchDTO.Players.ToList());
            players.FirstOrDefault().Color = Colors.White;
            var match = new Match(matchDTO.Reference, players, board);
            return this.matchRepository.Create(match);
        }

        public void Delete(string reference)
        {
            matchRepository.Delete(reference);
        }

        public IEnumerable<Match> GetAll()
        {
            return matchRepository.Get();
        }

        public Match GetByReference(string reference)
        {
            return matchRepository.GetByReference(reference);
        }

        public Match Update(Match match)
        {
            return matchRepository.Update(match);
        }
    }
}
