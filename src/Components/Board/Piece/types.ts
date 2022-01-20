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

const CommunMoves = {
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

type Move = {
    x: number,
    y: number
};

export type PieceMoves = {
    front?: Move,
    down?: Move,
    right?: Move,
    left?: Move,
    doubleFront?: Move,
    frontsideLeft?: Move,
    frontsideRight?: Move,
    downsideLeft?: Move,
    downsideRight?: Move,
};

export const Moves = () => {

    const Pawn: PieceMoves = {
        front: CommunMoves.front,
        doubleFront: CommunMoves.doubleFront,
        frontsideLeft: CommunMoves.frontsideLeft,
        frontsideRight: CommunMoves.frontsideRight,
    };

    const Tower: PieceMoves = {
        front: CommunMoves.fullFrontside,
        down: CommunMoves.fullDownside,
        left: CommunMoves.fullLeftside,
        right: CommunMoves.fullRightside,
    };

    const Horse: PieceMoves = {
        frontsideRight: CommunMoves.frontsideRight,
        frontsideLeft: CommunMoves.frontsideLeft,
        downsideRight: CommunMoves.downsideRight,
        downsideLeft: CommunMoves.downsideLeft,
    };

    const Bishop: PieceMoves = {
        frontsideRight: CommunMoves.fullFrontsideRight,
        frontsideLeft: CommunMoves.fullFrontsideLeft,
        downsideRight: CommunMoves.fullDownsideRight,
        downsideLeft: CommunMoves.fullDownsideLeft,
    };

    const Queen: PieceMoves = {
        front: CommunMoves.fullFrontside,
        down: CommunMoves.fullDownside,
        left: CommunMoves.fullLeftside,
        right: CommunMoves.fullRightside,
        frontsideRight: CommunMoves.fullFrontsideRight,
        frontsideLeft: CommunMoves.fullFrontsideLeft,
        downsideRight: CommunMoves.fullDownsideRight,
        downsideLeft: CommunMoves.fullDownsideLeft,
    };

    const King: PieceMoves = {
        front: CommunMoves.front,
        down: CommunMoves.down,
        left: CommunMoves.left,
        right: CommunMoves.right,
        frontsideRight: CommunMoves.frontsideRight,
        frontsideLeft: CommunMoves.frontsideLeft,
        downsideRight: CommunMoves.downsideRight,
        downsideLeft: CommunMoves.downsideLeft,
    };

    return {
        Pawn,
        Tower,
        Horse,
        Bishop,
        Queen,
        King,
    }
}

export class Piece {
    type: Types;
    coordinate: Coordinate;
    color: Colors;
    ableToChange: boolean;
    src: string;
    moves: PieceMoves;

    constructor(type: Types, coordinate: Coordinate, color: Colors, ableToChange: boolean, src: string, moves: PieceMoves,) {
        this.type = type;
        this.coordinate = coordinate;
        this.color = color;
        this.ableToChange = ableToChange;
        this.src = src;
        this.moves = moves;
    };

    getCurrentPosition(): string {
        return Alphabet[this.coordinate.alpha - 1] + this.coordinate.index.toString();
    }
};