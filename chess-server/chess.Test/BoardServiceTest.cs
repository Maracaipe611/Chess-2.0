using System;
using Xunit;
using Newtonsoft.Json;
using chess.Domain.Entities;
using System.Collections.Generic;
using chess.Application.Services.BoardService;
using chess.Application.Services.PieceService;
using chess.Application.Services.SquareService;
using Moq;
using System.Linq;
using chess.Application.Services.MoveService;
using System.IO;
using System.Reflection;

namespace chess.Test
{
    public class BoardServiceTest
    {
        private readonly BoardService boardService;
        private readonly PieceService pieceService;
        private readonly SquareService squareService;
        private readonly Mock<ISquareService> mockSquareService = new Mock<ISquareService>();
        private readonly Mock<IPieceService> mockPieceService = new Mock<IPieceService>();
        private readonly Mock<IMoveService> mockMoveService = new Mock<IMoveService>();
        public BoardServiceTest()
        {
            this.squareService = new SquareService();
            this.pieceService = new PieceService(mockMoveService.Object);
            this.boardService = new BoardService(mockSquareService.Object, mockPieceService.Object);
        }

        [Fact]
        public void BuildBoardTest()
        {
            //Arrange
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var boardString = System.IO.File.ReadAllText(path + @"./assets/Board-without-moves.json");
            var boardFromString = JsonConvert.DeserializeObject<List<Square>>(boardString);

            //Act
            var board = squareService.BuildAllSquares().ToList();
            var allPieces = pieceService.BuildAllPieces(board).ToList();
            foreach (var square in board)
            {
                square.Piece = allPieces.Find(piece => piece.Coordinate.Equals(square.Coordinate));
            }

            var boardBuiltedSerialized = JsonConvert.SerializeObject(board);
            var boardBoardStringSerialized = JsonConvert.SerializeObject(boardFromString);

            //Assert
            Assert.Equal(boardBoardStringSerialized, boardBuiltedSerialized);
        }

        [Fact]
        public void ValidateBuiltBoardTest()
        {
            //Arrange
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var boardString = System.IO.File.ReadAllText(path + "./assets/Board-with-moves.json");
            var boardFromString = JsonConvert.DeserializeObject<List<Square>>(boardString);
            //Act
            var board = boardService.ValidateMoves(boardFromString);
            //Assert
            Assert.Equal(boardFromString, board);
        }
    }
}
