import { Types } from "../../Components/Board/Piece/types";
import { Colors, Coordinate } from "../../Components/Board/types";

export interface PlayerDTO {
        id: number;
        color: Colors;
        name: string;
}

export interface MoveDTO {
        coordinate: Coordinate;
        direction: number;
}

export interface PieceDTO {
        type: Types;
        color: Colors;
        move: Array<MoveDTO>;
        coordinate: Coordinate;
}

export interface SquareDTO {
        coordinate: Coordinate;
        piece: PieceDTO;
        color: Colors;
}

export interface BoardDTO {
        id: string;
        squares: Array<SquareDTO>;
}

export interface MatchDTO {
        id: string;
        players: Array<PlayerDTO>;
        board: BoardDTO | null;
        reference: string;
        history?: Array<PieceDTO>;
}

