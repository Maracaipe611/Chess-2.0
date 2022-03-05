using chess.API.Models;
using chess.API.Models.DTO;
using System.Collections.Generic;

namespace chess.API.Services.MatchService
{
    public interface IMatchService
    {
        IList<Match> GetAll();
        Match GetByReference(string name);
        Match Create(MatchDTO matchDTO);
        Match Update(MatchDTO matchDTO);
        void Delete(string reference);
    }
}
