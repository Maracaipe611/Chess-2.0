using chess.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chess.Application.Facades.MatchFacade
{
    public class MatchFacade : IMatchFacade
    {
        public Match ValidateMoves(Match match)
        {
            var board = match.Board;
            var pieces = board.Where(square => square.Piece != null).Select(square => square.Piece);
            foreach (var piece in pieces)
            {
                switch (piece.Type)
                {
                    case Types.Pawn:
                    {
                        break;
                    }
                    case Types.Tower:
                    {
                        break;
                    }
                    case Types.Horse:
                    {
                        break;
                    }
                    case Types.Bishop:
                    {
                        break;
                    }
                    case Types.Queen:
                    {
                        break;
                    }
                    case Types.King:
                    {
                        break;
                    }
                }
            }
            match.Board = board;
            return match;
        }
    }
}
