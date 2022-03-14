using chess.Application.Services.BoardService;
using chess.Application.Services.SquareService;
using chess.Application.Services.MatchService;
using chess.Application.Services.MoveService;
using chess.Application.Services.PieceService;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace chess.Application.Providers
{
    public static class ServicesProvider
    {
        public static void Register(IServiceCollection serviceColleciton)
        {
            serviceColleciton.AddScoped<IBoardService, BoardService>();
            serviceColleciton.AddScoped<ISquareService, SquareService>();
            serviceColleciton.AddScoped<IMatchService, MatchService>();
            serviceColleciton.AddScoped<IMoveService, MoveService>();
            serviceColleciton.AddScoped<IPieceService, PieceService>();
            serviceColleciton.AddScoped<Hub, MatchHub>();
        }
    }
}
