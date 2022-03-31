import { Types } from "../../Components/Piece/types";
import { Colors, Coordinate } from "../Board/types";

export interface PossibleSquareToMoveDTO {
        id: string,
        direction: number,
}
export interface PlayerDTO {
        id?: string;
        color: Colors;
        name: string;
}

export interface PieceDTO {
        id: string;
        type: Types;
        color: Colors;
        possiblesSquaresToMove: Array<PossibleSquareToMoveDTO>;
        coordinate: Coordinate;
}

export interface SquareDTO {
        id: string,
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

