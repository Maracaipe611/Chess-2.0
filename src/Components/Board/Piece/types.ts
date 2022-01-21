import { Alphabet, Colors, Coordinate } from "../types";

export enum Types {
    Pawn = "Pawn",
    Tower = "Tower",
    Horse = "Horse",
    Bishop = "Bishop",
    Queen = "Queen",
    King = "King",
}

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
}

export type Move = {
    x: number,
    y: number
};

const CommonMoves: {
    [moveName: string]: Move,
} = {
    front: {
        x: 0,
        y: 1,
    },
    down: {
        x: 0,
        y: -1,
    },
    left: {
        x: -1,
        y: 0,
    },
    right: {
        x: 1,
        y: 0,
    },
    doubleFront: {
        x: 0,
        y: 2,
    },
    frontsideRight: {
        x: 1,
        y: 1,
    },
    frontsideLeft: {
        x: -1,
        y: 1,
    },
    downsideRight: {
        x: 1,
        y: -1,
    },
    downsideLeft: {
        x: -1,
        y: -1,
    },
    fullFrontside: {
        x: 0,
        y: 7,
    },
    fullDownside: {
        x: 0,
        y: -7,
    },
    fullLeftside: {
        x: -7,
        y: 0,
    },
    fullRightside: {
        x: 7,
        y: 0,
    },
    fullFrontsideRight: {
        x: 7,
        y: 7,
    },
    fullFrontsideLeft: {
        x: -7,
        y: 7,
    },
    fullDownsideRight: {
        x: 7,
        y: -7,
    },
    fullDownsideLeft: {
        x: -7,
        y: -7,
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
    src: string;
    moves: PieceMoves;

    constructor(id: string, type: Types, coordinate: Coordinate, color: Colors, src: string, moves: PieceMoves,) {
        this.id = id;
        this.type = type;
        this.coordinate = coordinate;
        this.color = color;
        this.src = src;
        this.moves = moves;
    }

    isAbleToChange(): boolean {
        return this.type === Types.Pawn;
    }

    getCurrentPosition(): string {
        return Alphabet[this.coordinate.alpha - 1] + this.coordinate.index.toString();
    }

    getHasMoved(movementHistory: Array<Piece>): boolean {
        return !!movementHistory.find(piece => piece.id === this.id);
    }
}