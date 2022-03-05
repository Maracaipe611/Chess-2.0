using chess.API.Services;
using chess.API.Services.BoardService;
using chess.API.Services.HouseService;
using chess.API.Services.MatchService;
using chess.API.Services.MoveService;
using chess.API.Services.PieceService;
using Microsoft.Extensions.DependencyInjection;

namespace chess.API.Providers
{
    public static class ServicesProvider
    {
        public static void Register(IServiceCollection serviceColleciton)
        {
            serviceColleciton.AddScoped<IBoardService, BoardService>();
            serviceColleciton.AddScoped<IHouseService, HouseService>();
            serviceColleciton.AddScoped<IMatchService, MatchService>();
            serviceColleciton.AddScoped<IMoveService, MoveService>();
            serviceColleciton.AddScoped<IPieceService, PieceService>();
        }
    }
}
