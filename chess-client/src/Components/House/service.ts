import Player from "../Player/types";
import { BuildAllPieces } from "../Piece/service";
import { AlphPositions, Piece } from "../Piece/types";
import { Colors, Coordinate } from "../../client/Board/types";
import House from "./types";

export const BoardBuilder = (player: Player, boardPieces?:Array<Piece>) => {

    const houseBuilder = (coordinate: Coordinate): House => {
        if (!boardPieces) boardPieces = BuildAllPieces();
        const WhitePieces = boardPieces.filter(piece => piece.color === Colors.White);
        const BlackPieces = boardPieces.filter(piece => piece.color === Colors.Black);
            
        const { alpha, index } = coordinate;

        const whitePieceOnThisHouse: Piece | undefined = WhitePieces.find(piece => piece.coordinate.alpha === alpha && piece.coordinate.index === index);
        const blackPieceOnThisHouse: Piece | undefined = BlackPieces.find(piece => piece.coordinate.alpha === alpha && piece.coordinate.index === index);
        const pieceOnThisHouse = blackPieceOnThisHouse ?? whitePieceOnThisHouse;

        const color = (alpha + index) % 2 === 0 ? Colors.Black : Colors.White;
        return new House(
            {
                alpha: alpha,
                index: index,
            },
            color,
            pieceOnThisHouse,
        );
    };
    const completedBoard = (): Array<House> => {
        const alphs: Array<AlphPositions> = player.houseOrder();
        const indexesPosition: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];

        const allHouses: Array<House> = alphs.flatMap(index => {
            return indexesPosition.map(alph => {
                const coordinate: Coordinate = {
                    alpha: alph,
                    index
                };
                return houseBuilder(coordinate);
            });
        });

        return allHouses;
    };
    return completedBoard();
};