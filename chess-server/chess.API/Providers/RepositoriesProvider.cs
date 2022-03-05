using chess.API.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace chess.API.Providers
{
    public static class RepositoriesProvider
    {
        public static void Register(IServiceCollection services)
        {
            services.AddSingleton<IMatchRepository, MatchRepository>();
        }
    }
}
