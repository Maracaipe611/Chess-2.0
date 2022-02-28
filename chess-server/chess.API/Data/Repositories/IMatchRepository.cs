using chess.API.Models;
using System.Collections.Generic;

namespace chess.API.Data.Repositories
{
    public interface IMatchRepository
    {
        Match Create(Match match);
        Match Update(Match match);
        Match GetByReference(string reference);
        void Delete(string reference);
        IList<Match> Get();
    }
}
