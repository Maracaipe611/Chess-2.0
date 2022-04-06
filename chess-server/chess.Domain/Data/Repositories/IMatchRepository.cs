using chess.Domain.Entities;
using System.Collections.Generic;

namespace chess.Domain.Data.Repositories
{
    public interface IMatchRepository
    {
        Match Create(Match match);
        Match Update(Match match);
        Match GetByReference(string reference);
        void Delete(string reference);
        IEnumerable<Match> Get();
    }
}
