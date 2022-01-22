import { Player } from "../../Player/types";
import { BuildAllPieces } from "../Piece/service";
import { AlphPositions, Piece } from "../Piece/types";
import { AllPiecesType, Colors, Coordinate } from "../types";
import House from "./types";

export const AllHouses = (player: Player | undefined) => {

    const buildSingleHouse = (allPieces: AllPiecesType, coordinate: Coordinate): House => {
        const { BlackPieces, WhitePieces } = allPieces;
        const { alpha, index } = coordinate;

        const whitePieceOnThisHouse: Piece | undefined = WhitePieces.find(piece => piece.coordinate.alpha === alpha && piece.coordinate.index === index);
        const blackPieceOnThisHouse: Piece | undefined = BlackPieces.find(piece => piece.coordinate.alpha === alpha && piece.coordinate.index === index);
        const pieceOnThisHouse = blackPieceOnThisHouse ? blackPieceOnThisHouse : whitePieceOnThisHouse;

        const color = (alpha + index) % 2 === 0 ? Colors.Black : Colors.White;
        const srcPrefix = "./Images/";
        const srcSufix = ".jpg";
        const src = srcPrefix + (color === Colors.White ? "lightWoodenHouse" : "woodenHouse") + srcSufix;
        return new House(
            {
                alpha: alpha,
                index: index,
            },
            !!pieceOnThisHouse,
            color,
            pieceOnThisHouse,
            src,
        );
    };
    const buildAllHouses = (allPieces: AllPiecesType): Array<House> => {
        const { A, B, C, D, E, F, G, H } = AlphPositions;
        const alphs: Array<AlphPositions> = player?.color === Colors.Black ?  [A, B, C, D, E, F, G, H] : [H, G, F, E, D, C, B, A];
        const indexesPosition: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];

        const allHouses: Array<House> = alphs.flatMap(index => {
            return indexesPosition.map(alph => {
                const coordinate: Coordinate = {
                    alpha: alph,
                    index
                };
                return buildSingleHouse(allPieces, coordinate);
            });
        });

        return allHouses;
    };
    return buildAllHouses(BuildAllPieces());
};