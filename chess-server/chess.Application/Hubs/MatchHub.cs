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
        private readonly IMatchService matchService;
        private readonly IMatchFacade matchFacade;

        public MatchHub(IMatchService matchService, IMatchFacade matchFacade)
        {
            this.matchService = matchService;
            this.matchFacade = matchFacade;
        }

        public async Task ReceiveMove(MatchDTO matchDTO)
        {
            var match = matchService.GetByReference(matchDTO.Reference);
            match.Board = matchFacade.ValidateMoves(match.Board);
            await Clients.Group("messageReceived").ReceiveMove(match);
        }

        public async Task WatchMatch(string reference)
        {
            var match = matchService.GetByReference(reference);
            await Clients.Group("watch").WatchMatch(match);
        }

        public async Task Teste(string value)
        {
            await Clients.All.ReceiveMessage($"Teste, {value}");
        }
    }
}
