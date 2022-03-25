using chess.Domain.Entities;
using chess.Domain.Entities.DTO;
using System.Collections.Generic;

namespace chess.Domain.Entities.DTO
{
    public class MatchDTO
    {
        public string Reference { get; set; }
        public IList<PlayerDTO> Players { get; set; }

        #nullable enable
        public IList<Square>? Board { get; set; }
    }
}
