using chess.Application.Facades.MatchFacade;
using chess.Application.Hubs.Interfaces;
using chess.Application.Services.MatchService;
using chess.Domain.Entities.DTO;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace chess.Application
{
    public class MatchHub : Hub<IMatchHub>
    {
        private readonly MatchFacade matchFacade;

        public MatchHub(MatchFacade matchFacade)
        {
            this.matchFacade = matchFacade;
        }

        public async Task ReceiveMove(MatchDTO matchDTO)
        {
            var match = matchFacade.GetByReference(matchDTO.Reference);
            match.Board = matchFacade.ValidateMoves(match.Board);
            await Clients.Group("messageReceived").ReceiveMove(match);
        }

        public async Task WatchMatch(string reference)
        {
            var match = matchFacade.GetByReference(reference);
            await Clients.Group("watch").WatchMatch(match);
        }

        public async Task ValidateNewMatch(MatchDTO matchDTO)
        {
            var match = matchFacade.GetByReference(matchDTO.Reference);
            match.Board = matchFacade.ValidateMoves(match.Board);
            await Clients.All.ReceiveNewBoard(match);
        }
    }
}
