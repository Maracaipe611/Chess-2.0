using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace chess.Application
{
    public class MatchHub : Hub
    {
        public async Task NewMessage(string value)
        {
            await Clients.All.SendAsync("messageReceived", value);
        }
    }
}
