using AutoMapper;
using chess.Domain.Entities;
using chess.Domain.Entities.DTO;

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
