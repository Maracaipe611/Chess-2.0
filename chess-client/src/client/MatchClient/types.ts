import { Types } from "../../Components/Board/Piece/types";
import { Colors, Coordinate } from "../../Components/Board/types";

export interface Player {
        id: number;
        color: Colors;
        name: string;
}

export interface Move {
        coordinate: Coordinate;
        direction: number;
}

export interface Piece {
        type: Types;
        color: Colors;
        move: Array<Move>;
        coordinate: Coordinate;
}

export interface Square {
        coordinate: Coordinate;
        piece: Piece;
        color: Colors;
}

export interface Board {
        id: string;
        squares: Array<Square>;
}

export interface Match {
        id: string;
        players: Array<Player>;
        board: Board;
        reference: string;
        history?: Array<Piece>;
}

