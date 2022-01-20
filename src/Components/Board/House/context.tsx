import { createContext } from "react";
import { BuildAllPieces } from "../Piece/context";
import { AlphPositions, IndexPositions, Piece } from "../Piece/types";
import { AllPiecesType, Colors, Coordinate } from "../types";
import House from "./types";

type HousesContextProviderProps = {
    children: React.ReactNode,
};

const buildSingleHouse = (allPieces: AllPiecesType, coordinate: Coordinate): House => {
    const { BlackPieces, WhitePieces } = allPieces;
    const { alpha, index } = coordinate;

    const whitePieceOnThisHouse: Piece | undefined = WhitePieces.find(piece => piece.coordinate.alpha === alpha && piece.coordinate.index === index);
    const blackPieceOnThisHouse: Piece | undefined = BlackPieces.find(piece => piece.coordinate.alpha === alpha && piece.coordinate.index === index);
    const pieceOnThisHouse = !!blackPieceOnThisHouse ? blackPieceOnThisHouse : whitePieceOnThisHouse;

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
    //inverter letras para trocar o lado do tabuleiro
    const alphs: Array<AlphPositions> = [H, G, F, E, D, C, B, A];
    // const alphs: Array<AlphPositions> = [A, B, C, D, E, F, G, H];
    const indexesPosition: Array<IndexPositions> = [1, 2, 3, 4, 5, 6, 7, 8];

    const allHouses: Array<House> = alphs.flatMap(index => {
        return indexesPosition.map(alph => {
            const coordinate: Coordinate = {
                alpha: alph,
                index
            }
            return buildSingleHouse(allPieces, coordinate);
        });
    });

    return allHouses;
}

export const HousesContext = createContext(buildAllHouses(BuildAllPieces()));

export const HousesContextProvider = ({
    children
}: HousesContextProviderProps) => {
    return (
        <HousesContext.Provider value={buildAllHouses(BuildAllPieces())}>
            {children}
        </HousesContext.Provider>
    );
};