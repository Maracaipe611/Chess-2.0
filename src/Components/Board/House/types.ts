import { Piece } from "../Piece/types";
import { Alphabet, Colors, Coordinate } from "../types";

export default class House {
    coordinate: Coordinate;
    busy: boolean;
    color: Colors;
    piece?: Piece | undefined;
    src: string;

    constructor(coordinate: Coordinate, busy: boolean, color: Colors, piece: Piece | undefined, src:string) {
        this.coordinate = coordinate;
        this.busy = busy;
        this.color = color;
        this.piece = piece;
        this.src = src;
    };

    getCurrentPosition(): string {
        return Alphabet[this.coordinate.alpha - 1] + this.coordinate.index.toString();
    };
};