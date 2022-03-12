using AutoMapper;
using chess.API.Models;
using chess.API.Models.DTO;

namespace chess.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            #region Player
            CreateMap<Player, PlayerDTO>();
            CreateMap<PlayerDTO, Player>();
            #endregion
        }
    }
}
