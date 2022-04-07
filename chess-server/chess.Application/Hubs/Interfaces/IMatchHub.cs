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
        Task NewPlayerJoined(Match match);
        Task UpdateMatch(Match match);
    }
}
