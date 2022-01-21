import { AlphPositions, IndexPositions, Piece } from "./Piece/types";

export const Alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",];
export enum Colors { White = "White", Black = "Black" }

export type AllPiecesType = {
    WhitePieces: Array<Piece>,
    BlackPieces: Array<Piece>,
};

export type Coordinate = {
    alpha: AlphPositions,
    index: IndexPositions,
};