using chess.Application.Facades.MatchFacade;
using chess.Domain.Entities;
using chess.Domain.Entities.DTO;
using System.Collections.Generic;

namespace chess.Application.Services.MatchService
{
    public interface IMatchService
    {
        IEnumerable<Match> GetAll();
        Match GetByReference(string name);
        Match Create(MatchDTO matchDTO);
        Match Update(Match matchDTO);
        void Delete(string reference);
    }
}
