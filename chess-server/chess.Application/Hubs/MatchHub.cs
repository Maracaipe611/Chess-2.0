using chess.Application.Facades.MatchFacade;
using chess.Application.Hubs.Interfaces;
using chess.Application.Services.MatchService;
using chess.Domain.Entities;
using chess.Domain.Entities.DTO;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace chess.Application
{
    public class MatchHub : Hub<IMatchHub>
    {
        private readonly MatchFacade matchFacade;

        public MatchHub(MatchFacade matchFacade)
        {
            this.matchFacade = matchFacade;
        }

        public async void JoinMatch(string reference)
        {
            await Groups.AddToGroupAsync(this.Context.ConnectionId, reference);
        }

        public async Task ReceiveMove(MatchDTO matchDTO)
        {
            var match = matchFacade.GetByReference(matchDTO.Reference);
            match.Board = matchFacade.ValidateMoves(match.Board);
            await Clients.Group("messageReceived").ReceiveMove(match);
        }

        public async Task WatchMatch(string reference)
        {
            var match = matchFacade.GetByReference(reference);
            await Clients.Group("watch").WatchMatch(match);
        }

        public async Task ValidateNewMatch(Square selectedHouse, Square futureHouse, string reference)
        {
            var match = matchFacade.GetByReference(reference);
            MovePiece(selectedHouse, futureHouse, ref match);
            match.Board = matchFacade.BuildPossiblesSquaresToMove(match.Board);
            match.Board = matchFacade.ValidateMoves(match.Board);
            var updatedMatch = matchFacade.Update(match);
            await Clients.Group(reference).UpdateMatch(updatedMatch);
        }

        private static void MovePiece(Square selectedHouse, Square futureHouse, ref Match match)
        {
            var pieceMoved = selectedHouse.Piece;
            pieceMoved.Coordinate = futureHouse.Coordinate;
            foreach (var house in match.Board)
            {
                if (house.Coordinate.Equals(selectedHouse.Coordinate))
                {
                    house.Piece = null;
                }
                else
                if (house.Coordinate.Equals(futureHouse.Coordinate))
                {
                    house.Piece = pieceMoved;
                }
            }
        }
    }
}
