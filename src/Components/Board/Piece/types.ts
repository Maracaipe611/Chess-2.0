import House from "../House/types";
import { Alphabet, Colors, Coordinate } from "../types";
import { Move } from "../../GameLogic/Moves/moves";

export enum Types {
    Pawn = "Pawn",
    Tower = "Tower",
    Horse = "Horse",
    Bishop = "Bishop",
    Queen = "Queen",
    King = "King",
}

export enum AlphPositions {
    "A" = 1,
    "B" = 2,
    "C" = 3,
    "D" = 4,
    "E" = 5,
    "F" = 6,
    "G" = 7,
    "H" = 8,
}

export class Piece {
    id: string;
    type: Types;
    coordinate: Coordinate;
    color: Colors;
    imageSource: string;
    moves: Array<Move>;

    constructor(id: string, type: Types, coordinate: Coordinate, color: Colors, imageSource: string, moves: Array<Move>,) {
        this.id = id;
        this.type = type;
        this.coordinate = coordinate;
        this.color = color;
        this.imageSource = imageSource;
        this.moves = moves;
    }

    isAbleToChange(): boolean {
        return this.type === Types.Pawn;
    }

    currentPosition(): string {
        return Alphabet[this.coordinate.alpha - 1] + this.coordinate.index.toString();
    }

    hasMoved(movementHistory: Array<Piece>): boolean {
        return !!movementHistory.find(piece => piece.id === this.id);
    }

    howManyTimesMoved(movementHistory: Array<Piece>): number {
        return movementHistory.filter(piece => piece.id === this.id).length;
    }

    findHouse = (boardHouses: Array<House>): House | undefined => {
        return boardHouses.find(house => house.piece?.id === this.id);
    };
}