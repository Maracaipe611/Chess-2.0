import House from "../House/types";
import { Alphabet, Colors, Coordinate } from "../types";

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

export type Move = {
    alpha: number,
    index: number
};

const CommonMoves: {
    [moveName: string]: Move,
} = {
    front: {
        alpha: 0,
        index: 1,
    },
    down: {
        alpha: 0,
        index: -1,
    },
    left: {
        alpha: -1,
        index: 0,
    },
    right: {
        alpha: 1,
        index: 0,
    },
    doubleFront: {
        alpha: 0,
        index: 2,
    },
    frontsideRight: {
        alpha: 1,
        index: 1,
    },
    frontsideLeft: {
        alpha: -1,
        index: 1,
    },
    downsideRight: {
        alpha: 1,
        index: -1,
    },
    downsideLeft: {
        alpha: -1,
        index: -1,
    },
    fullFrontside: {
        alpha: 0,
        index: 7,
    },
    fullDownside: {
        alpha: 0,
        index: -7,
    },
    fullLeftside: {
        alpha: -7,
        index: 0,
    },
    fullRightside: {
        alpha: 7,
        index: 0,
    },
    fullFrontsideRight: {
        alpha: 7,
        index: 7,
    },
    fullFrontsideLeft: {
        alpha: -7,
        index: 7,
    },
    fullDownsideRight: {
        alpha: 7,
        index: -7,
    },
    fullDownsideLeft: {
        alpha: -7,
        index: -7,
    },
};

export type PieceMoves = [
    front?: Move,
    down?: Move,
    right?: Move,
    left?: Move,
    doubleFront?: Move,
    frontsideLeft?: Move,
    frontsideRight?: Move,
    downsideLeft?: Move,
    downsideRight?: Move,
];

export const Moves = ():Array<PieceMoves> => {

    const Pawn: PieceMoves = [
        CommonMoves.front,
        CommonMoves.doubleFront,
        CommonMoves.frontsideLeft,
        CommonMoves.frontsideRight,
    ];

    const Tower: PieceMoves = [
        CommonMoves.fullFrontside,
        CommonMoves.fullDownside,
        CommonMoves.fullLeftside,
        CommonMoves.fullRightside,
    ];

    const Horse: PieceMoves = [
        CommonMoves.frontsideRight,
        CommonMoves.frontsideLeft,
        CommonMoves.downsideRight,
        CommonMoves.downsideLeft,
    ];

    const Bishop: PieceMoves = [
        CommonMoves.fullFrontsideRight,
        CommonMoves.fullFrontsideLeft,
        CommonMoves.fullDownsideRight,
        CommonMoves.fullDownsideLeft,
    ];

    const Queen: PieceMoves = [
        CommonMoves.fullFrontside,
        CommonMoves.fullDownside,
        CommonMoves.fullLeftside,
        CommonMoves.fullRightside,
        CommonMoves.fullFrontsideRight,
        CommonMoves.fullFrontsideLeft,
        CommonMoves.fullDownsideRight,
        CommonMoves.fullDownsideLeft,
    ];

    const King: PieceMoves = [
        CommonMoves.front,
        CommonMoves.down,
        CommonMoves.left,
        CommonMoves.right,
        CommonMoves.frontsideRight,
        CommonMoves.frontsideLeft,
        CommonMoves.downsideRight,
        CommonMoves.downsideLeft,
    ];

    return [
        Pawn,
        Tower,
        Horse,
        Bishop,
        Queen,
        King,
    ];
};

export class Piece {
    id: string;
    type: Types;
    coordinate: Coordinate;
    color: Colors;
    imageSource: string;
    moves: PieceMoves;

    constructor(id: string, type: Types, coordinate: Coordinate, color: Colors, imageSource: string, moves: PieceMoves,) {
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