import { Types } from "../../Board/Piece/types";

export type Move = {
    alpha: number,
    index: number,
    direction?: string,
};

export const CommonMoves: { [moveName: string]: Move } = {
    front: {
        alpha: 0,
        index: 1,
    },
    down: {
        alpha: 0,
        index: -1,
    },
    left: {
        alpha: -1,
        index: 0,
    },
    right: {
        alpha: 1,
        index: 0,
    },
    doubleFront: {
        alpha: 0,
        index: 2,
    },
    frontsideRight: {
        alpha: 1,
        index: 1,
    },
    frontsideLeft: {
        alpha: -1,
        index: 1,
    },
};

export const MovesDirectionsHorizontalVertical = ():Array<Move> => {
    const front = {
        alpha: 0,
        index: 1,
        direction: "front",
    };
    const down = {
        alpha: 0,
        index: -1,
        direction: "down",
    };
    const left = {
        alpha: -1,
        index: 0,
        direction: "left",
    };
    const right = {
        alpha: 1,
        index: 0,
        direction: "right",
    };
    return [front, down, left, right];
};

export const MovesDirectionsDiagonal = ():Array<Move> => {
    const frontsideRight = {
        alpha: 1,
        index: 1,
        direction: "frontsideRight",
    };
    const frontsideLeft = {
        alpha: -1,
        index: 1,
        direction: "frontsideLeft",
    };
    const downsideRight = {
        alpha: 1,
        index: -1,
        direction: "downsideRight",
    };
    const downsideLeft = {
        alpha: -1,
        index: -1,
        direction: "downsideLeft",
    };
    return [frontsideRight, frontsideLeft, downsideLeft, downsideRight];
};

const buildMove = (pieceType: Types):Array<Move> => {
    const moves = new Array<Move>();
    switch (pieceType) {
    case Types.Bishop:
        for (let i = 1; i <= 7; i++) {
            MovesDirectionsDiagonal().forEach(move => {
                moves.push({
                    alpha: i * move.alpha,
                    index: i * move.index,
                    direction: move.direction,
                });
            });
        }
        break;
    case Types.Tower:
        for (let i = 1; i <= 7; i++) {
            MovesDirectionsHorizontalVertical().forEach(move => {
                moves.push({
                    alpha: i * move.alpha,
                    index: i * move.index,
                    direction: move.direction,
                });
            });
        }
        break;
    case Types.Queen:
        for (let i = 1; i <= 7; i++) {
            MovesDirectionsHorizontalVertical().forEach(move => {
                moves.push({
                    alpha: i * move.alpha,
                    index: i * move.index,
                    direction: move.direction,
                });
            });
            MovesDirectionsDiagonal().forEach(move => {
                moves.push({
                    alpha: i * move.alpha,
                    index: i * move.index,
                    direction: move.direction,
                });
            });
        }
        break;
    case Types.Horse: {
        let stepIndex = 2;
        let stepAlpha = 1;
        
        MovesDirectionsDiagonal().forEach(move => {
            moves.push({
                alpha: stepAlpha * move.alpha,
                index: stepIndex * move.index,
                direction: move.direction,
            });
        });

        stepIndex = 1;
        stepAlpha = 2;

        MovesDirectionsDiagonal().forEach(move => {
            moves.push({
                alpha: stepAlpha * move.alpha,
                index: stepIndex * move.index,
                direction: move.direction,
            });
        });
        break;
    }
    default:
        break;
    }
    return moves;
};

export const PieceMoves = () => {
    const Pawn = [
        CommonMoves.front,
        CommonMoves.doubleFront,
        CommonMoves.frontsideLeft,
        CommonMoves.frontsideRight,
    ];

    const Horse = buildMove(Types.Horse);
    const Tower = buildMove(Types.Tower);
    const Bishop = buildMove(Types.Bishop);
    const Queen = buildMove(Types.Queen);
    const King = [
        CommonMoves.front,
        CommonMoves.down,
        CommonMoves.left,
        CommonMoves.right,
    ];

    return [
        Pawn,
        Tower,
        Horse,
        Bishop,
        Queen,
        King,
    ];
};