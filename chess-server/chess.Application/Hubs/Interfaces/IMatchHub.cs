using chess.Domain.Entities;
using chess.Domain.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chess.Application.Hubs.Interfaces
{
    public interface IMatchHub
    {
        Task ReceiveMove(Match match);
        Task WatchMatch(Match match);
    }
}
