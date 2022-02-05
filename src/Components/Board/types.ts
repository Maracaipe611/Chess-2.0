import { AlphPositions } from "./Piece/types";

export const Alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",];
export enum Colors { White = "White", Black = "Black" }

export type Coordinate = {
    alpha: AlphPositions,
    index: number,
};