import Player from "../../Components/Player/types";
import House from "../../Components/House/types";
import { AlphPositions, Piece } from "../../Components/Piece/types";

export const Alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",];
export enum Colors { White = 0, Black = 1 }
export enum ColorsVerbose { White = "White", Black = "Black" }

export type Coordinate = {
    alpha: AlphPositions | number,
    index: number,
};

export class Match {
    id: string;
    players: Array<Player>;
    board: Array<House> | undefined;
    reference: string;
    history: Array<Piece>;
    constructor(id: string, board: Array<House> | undefined, players: Array<Player>, reference: string) {
        this.id = id;
        this.board = board;
        this.players = players;
        this.reference = reference;
        this.history = new Array<Piece>();
    }

    addHistory(piece:Piece) {
        this.history.push(piece);
    }
}