import { Alphabet, Colors, Coordinate } from "../types";

export enum Types {
    Pawn = "Pawn",
    Tower = "Tower",
    Horse = "Horse",
    Bishop = "Bishop",
    Queen = "Queen",
    King = "King",
};

export type IndexPositions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export enum AlphPositions {
    "A" = 1,
    "B" = 2,
    "C" = 3,
    "D" = 4,
    "E" = 5,
    "F" = 6,
    "G" = 7,
    "H" = 8,
};

export class Piece {
    type: Types;
    coordinate: Coordinate;
    color: Colors;
    ableToChange: boolean;
    src: string;

    constructor(type: Types, coordinate: Coordinate, color: Colors, ableToChange: boolean, src: string) {
        this.type = type;
        this.coordinate = coordinate;
        this.color = color;
        this.ableToChange = ableToChange;
        this.src = src;
    };

    getCurrentPosition(): string {
        return Alphabet[this.coordinate.alpha - 1] + this.coordinate.index.toString();
    }
};