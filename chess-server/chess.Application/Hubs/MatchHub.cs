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

        public MatchHub(IMatchService matchService)
        {
            this.matchService = matchService;
        }

        public async Task ReceiveMove(MatchDTO matchDTO)
        {
            var match = matchService.GetByReference(matchDTO.Reference);
            await Clients.Group("messageReceived").ReceiveMove(match);
        }

        public async Task WatchMatch(string reference)
        {
            var match = matchService.GetByReference(reference);
            await Clients.All.WatchMatch(match);
        }
    }
}
