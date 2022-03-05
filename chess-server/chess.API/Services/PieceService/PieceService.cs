using chess.API.Models;
using chess.API.Services.MoveService;
using System.Collections.Generic;
using System.Linq;

namespace chess.API.Services.PieceService
{
    public class PieceService : IPieceService
    {
        private readonly IMoveService moveService;

        public PieceService(IMoveService moveService)
        {
            this.moveService = moveService;
        }

        public IList<Piece> BuildAllPieces()
        {
            var allPieces = new List<Piece>();
            var piecesTypes = new List<Types>
            {
                Types.Pawn,
                Types.Tower,
                Types.Horse,
                Types.Bishop,
                Types.Queen,
                Types.King
            };

            var colors = new List<Colors>
            {
                Colors.White,
                Colors.Black
            };

            foreach (var color in colors)
            {
                foreach (var pieceType in piecesTypes)
                {
                    var alphaPositions = DefaultAlphPositions(pieceType);
                    foreach (var alpha in alphaPositions)
                    {
                        List<Move> moves = moveService.BuildMoves(pieceType).ToList();
                        int index = DefaultIndexPositions(pieceType, color);
                        Coordinate coordinate = new Coordinate(alpha, index);
                        allPieces.Add(new Piece(pieceType, moves, color, coordinate));
                    }
                }
            }
            return allPieces;
        }

        #region Private
        private static int DefaultIndexPositions(Types type, Colors color)
        {
            if(type == Types.Pawn)
            {
                return color == Colors.White ? 2 : 7;
            }

            return color == Colors.White ? 1 : 8;
        }
        private static List<int> DefaultAlphPositions(Types type)
        {
            List<int> positions = new List<int>();
            switch (type)
            {
                case Types.Pawn:
                    for (int i = 1; i <= 8; i++)
                    {
                        positions.Add(i);
                    }
                    return positions;
                case Types.Tower:
                    positions.Add(1);
                    positions.Add(8);
                    return positions;
                case Types.Horse:
                    positions.Add(2);
                    positions.Add(7);
                    return positions;
                case Types.Bishop:
                    positions.Add(3);
                    positions.Add(6);
                    return positions;
                case Types.King:
                    positions.Add(4);
                    return positions;
                case Types.Queen:
                    positions.Add(5);
                    return positions;
                default:
                    return positions;
            }
        }
        #endregion
    }
}
