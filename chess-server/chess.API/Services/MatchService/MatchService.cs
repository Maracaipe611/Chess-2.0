using AutoMapper;
using chess.API.Data.Repositories;
using chess.API.Models;
using chess.API.Models.DTO;
using chess.API.Services.BoardService;
using System.Collections.Generic;
using System.Linq;

namespace chess.API.Services.MatchService
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
            Board board = boardService.BuildBoard();
            var players = mapper.Map<List<PlayerDTO>, List<Player>>(matchDTO.Players.ToList());
            var match = new Match(matchDTO.Reference, players, board);
            return this.matchRepository.Create(match);
        }

        public void Delete(string reference)
        {
            matchRepository.Delete(reference);
        }

        public IList<Match> GetAll()
        {
            return matchRepository.Get();
        }

        public Match GetByReference(string name)
        {
            var match = matchRepository.GetByReference(name);
            return match;
        }

        public Match Update(MatchDTO matchDTO)
        {
            Match newMatch = matchRepository.GetByReference(matchDTO.Reference); //recebo todas as props da match anterior
            newMatch.Board = matchDTO.Board; //substituo apenas o board
            return matchRepository.Update(newMatch);
        }
    }
}
