using AutoMapper;
using chess.API.Data.Repositories;
using chess.API.Models;
using chess.API.Models.DTO;
using System.Collections.Generic;
using System.Linq;

namespace chess.API.Services
{
    public class MatchService : IMatchService
    {
        private readonly IMatchRepository matchRepository;
        private readonly IMapper mapper;
        public MatchService(IMatchRepository matchRepository, IMapper mapper)
        {
            this.matchRepository = matchRepository;
            this.mapper = mapper;
        }
        public Match Create(MatchDTO matchDTO)
        {
            var players = this.mapper.Map<List<PlayerDTO>, List<Player>>(matchDTO.Players.ToList());
            var match = new Match(matchDTO.Reference, players);
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
            var newMatch = matchRepository.GetByReference(matchDTO.Reference);
            newMatch.Board = matchDTO.Board;
            return this.matchRepository.Update(newMatch);
        }
    }
}
