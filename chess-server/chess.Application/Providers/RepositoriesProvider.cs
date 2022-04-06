using chess.Domain.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace chess.Application.Providers
{
    public static class RepositoriesProvider
    {
        public static void Register(IServiceCollection services)
        {
            services.AddSingleton<IMatchRepository, MatchRepository>();
        }
    }
}
