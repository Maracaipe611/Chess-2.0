import { AlphPositions } from "../Board/Piece/types";
import { Colors } from "../Board/types";

export enum direction {
    forward = 1,
    backward = -1
}

export enum Actions {
    "NoPiece",
    "FriendlyPiece",
    "EnemyPiece",
    "EnemyPieceAndEat",
    "NoPieceAndMove",
    "Unselect",
    "UnselectEnemy",
}

export default class Player {
    name: string;
    color: Colors;
    canViewPossibleEnemyMoves: boolean;

    constructor(name: string, color: Colors, canViewPossibleEnemyMoves: boolean) {
        this.name = name;
        this.color = color;
        this.canViewPossibleEnemyMoves = canViewPossibleEnemyMoves;
    }

    enemyColor() {
        return this.color == Colors.Black ? Colors.White : Colors.Black;
    }

    direction(pieceIsMine: boolean):number {
        return pieceIsMine ? (this.color === Colors.White ? direction.forward : direction.backward) : (this.color === Colors.Black ? direction.forward : direction.backward);
    }

    viewEnemyMoves(): Player {
        this.canViewPossibleEnemyMoves = true;
        return this;
    }

    houseOrder():Array<AlphPositions> {
        const { A, B, C, D, E, F, G, H } = AlphPositions;
        return this.color === Colors.Black ? [A, B, C, D, E, F, G, H] : [H, G, F, E, D, C, B, A];
    }
}