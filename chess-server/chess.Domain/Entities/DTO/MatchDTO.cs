using chess.Domain.Entities;
using chess.Domain.Entities.DTO;
using System.Collections.Generic;

namespace chess.Domain.Entities.DTO
{
    public class MatchDTO
    {
        public string Reference { get; set; }
        public IEnumerable<PlayerDTO> Players { get; set; }

        #nullable enable
        public IEnumerable<Square>? Board { get; set; }
    }
}
