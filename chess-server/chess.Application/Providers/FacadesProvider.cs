using chess.Application.Facades.MatchFacade;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chess.Application.Providers
{
    public static class FacadesProvider
    {
        public static void Register(IServiceCollection serviceColleciton)
        {
            serviceColleciton.AddScoped<IMatchFacade, MatchFacade>();
        }
    }
}
