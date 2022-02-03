import { Piece } from "../Board/Piece/types";
import { Colors } from "../Board/types";

export enum direction {
    forward = 1,
    backward = -1
}

export default class Player {
    name: string;
    color: Colors;

    constructor(name:string, color:Colors) {
        this.name = name;
        this.color = color;
    }

    friendlyPiece(piece: Piece):boolean {
        return this.color === piece.color;
    }

    enemyColor() {
        return this.color == Colors.Black ? Colors.White : Colors.Black;
    }

    direction(pieceIsMine: boolean):number {
        return pieceIsMine ? (this.color === Colors.White ? direction.forward : direction.backward) : (this.color === Colors.Black ? direction.forward : direction.backward);
    }
}