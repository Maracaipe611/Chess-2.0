using System.Collections.Generic;

namespace chess.API.Models.DTO
{
    public class MatchDTO
    {
        public string Reference { get; set; }
        public IList<PlayerDTO> Players { get; set; }

        #nullable enable
        public Board? Board { get; set; }
    }
}
