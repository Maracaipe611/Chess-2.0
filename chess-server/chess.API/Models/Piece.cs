using System;
using System.Collections.Generic;
using static chess.API.Models.Colors;

namespace chess.API.Models
{
    public class Piece
    {
        public Piece(Types type, IList<Move> moves, ColorsType color, Coordinate coordinate)
        {
            Type = type;
            Move = moves;
            Color = color;
            Coordinate = coordinate;
        }
        public Types Type { get; set; }
        public ColorsType Color { get; set; }
        public IList<Move> Move { get; set; }
        public Coordinate Coordinate { get; set; }
    }
    public enum Types
    {
        Pawn,
        Tower,
        Horse,
        Bishop,
        Queen,
        King,
    }

    public class PieceBuilder
    {
        public PieceBuilder() { }
        public List<Piece> buildAllPieces()
        {
            var allPieces = new List<Piece>();
            var piecesTypes = new List<Types>();
            piecesTypes.Add(Types.Pawn);
            piecesTypes.Add(Types.Tower);
            piecesTypes.Add(Types.Horse);
            piecesTypes.Add(Types.Bishop);
            piecesTypes.Add(Types.Queen);
            piecesTypes.Add(Types.King);

            var colors = new List<ColorsType>();
            colors.Add(ColorsType.White);
            colors.Add(ColorsType.Black);

            foreach (var color in colors)
            {
                foreach (var pieceType in piecesTypes)
                {
                    var alphaPositions = defaultAlphPositions(pieceType);
                    foreach (var alpha in alphaPositions)
                    {
                        List<Move> moves = new MovesBuilder().buildPieceMoves(pieceType);
                        int index = defaultIndexPositions(pieceType, color);
                        Coordinate coordinate = new Coordinate(alpha, index);
                        allPieces.Add(new Piece(pieceType, moves, color, coordinate));
                    }
                }
            }
            return allPieces;
        }

        #region Private
        private int defaultIndexPositions(Types type, ColorsType color)
        {
            switch (type)
            {
                case Types.Pawn:
                    return color == ColorsType.White ? 2 : 7;
                default:
                    return color == ColorsType.White ? 1 : 8;
            }
        }
        private List<int> defaultAlphPositions(Types type)
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
