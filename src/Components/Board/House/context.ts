import { Piece, Colors, Coordinate } from "../Piece/context";

export default class House {
    coordinate: Coordinate;
    busy: boolean;
    color: Colors;
    piece?: Piece | undefined;

    constructor(coordinate: Coordinate, busy: boolean, color: Colors, piece: Piece | undefined) {
        this.coordinate = coordinate;
        this.busy = busy;
        this.color = color;
        this.piece = piece;
    }
}