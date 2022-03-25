import { Types } from "../../Components/Board/Piece/types";
import { Colors, Coordinate } from "../../Components/Board/types";

export interface PlayerDTO {
        id?: string;
        color: Colors;
        name: string;
}

export interface MoveDTO {
        coordinate: Coordinate;
        direction: number;
}

export interface PieceDTO {
        id: string;
        type: Types;
        color: Colors;
        move: Array<MoveDTO>;
        coordinate: Coordinate;
}

export interface SquareDTO {
        coordinate: Coordinate;
        piece: PieceDTO | undefined;
        color: Colors;
}
export interface MatchDTO {
        id?: string | undefined;
        players: Array<PlayerDTO>;
        board: Array<SquareDTO> | null;
        reference: string;
        history?: Array<PieceDTO>;
}

