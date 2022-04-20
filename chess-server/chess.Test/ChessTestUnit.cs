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

namespace chess.Test
{
    public class BoardServiceTest
    {
        private readonly BoardService boardService;
        private readonly Mock<ISquareService> mockSquareService = new Mock<ISquareService>();
        private readonly Mock<IPieceService> mockPieceService = new Mock<IPieceService>();
        public BoardServiceTest()
        {
            this.boardService = new BoardService(mockSquareService.Object, mockPieceService.Object);
        }

        [Fact]
        public void ValidateBuildedBoardTeste()
        {
            //Arrange
            var boardString = System.IO.File.ReadAllText(@"C:/personal/chess-2.0/chess-server/chess.Test/assets/New-Board.json");
            var boardFromString = JsonConvert.DeserializeObject<List<Square>>(boardString);
            //Act
            var board = boardService.ValidateMoves(boardFromString);
            //Assert
            Assert.Equal(boardFromString, board);
        }
    }
}
