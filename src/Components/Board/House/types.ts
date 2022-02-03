import { Piece } from "../Piece/types";
import { Alphabet, Colors, Coordinate } from "../types";

export default class House {
    coordinate: Coordinate;
    busy: boolean;
    color: Colors;
    piece?: Piece | undefined;
    imageSource: string;

    constructor(coordinate: Coordinate, busy: boolean, color: Colors, piece: Piece | undefined, imageSource:string) {
        this.coordinate = coordinate;
        this.busy = busy;
        this.color = color;
        this.piece = piece;
        this.imageSource = imageSource;
    }

    currentPosition(): string {
        return Alphabet[this.coordinate.alpha - 1] + this.coordinate.index.toString();
    }

    checkIfHouseIsOnThisArray(sampleArray: Array<House>): boolean {
        return !!sampleArray.find(house => this.currentPosition() === house.currentPosition());
    }
}