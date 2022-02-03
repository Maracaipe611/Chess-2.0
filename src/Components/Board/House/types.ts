import Player from "../../Player/types";
import { Piece, Types } from "../Piece/types";
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

    pseudoPawn(movementHistory: Array<Piece>, player:Player): Piece | undefined {
        const lastPiece = movementHistory[movementHistory.length - 1];
        if (!lastPiece 
        || lastPiece.type !== Types.Pawn
        || lastPiece.howManyTimesMoved(movementHistory) !== 1
        || lastPiece.color === player.color) return undefined;
        
        const lastMovementWasDoubleFront = lastPiece.coordinate.index === 4 || lastPiece.coordinate.index === 5; //independente dar cor, se for o primeiro movimento e ele parar no meio, é pq foi doublefront
        if (!lastMovementWasDoubleFront 
        || (this.coordinate.index !== lastPiece.coordinate.index - player.direction(lastPiece.color === player.color))
        || (this.coordinate.alpha !== lastPiece.coordinate.alpha)) return undefined;

        return lastPiece;
    }
}