import Player from "../Player/types";
import House from "./House/types";
import { AlphPositions, Piece } from "./Piece/types";

export const Alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",];
export enum Colors { White = "White", Black = "Black" }

export type Coordinate = {
    alpha: AlphPositions | number,
    index: number,
};

export class Match {
    id: string;
    board: Array<House> | undefined;
    players: Array<Player>;
    history: Array<Piece> | undefined;
    constructor(id: string, board: Array<House> | undefined, players: Array<Player>, history: Array<Piece> | undefined) {
        this.id = id;
        this.board = board;
        this.players = players;
        this.history = history;
    }
}