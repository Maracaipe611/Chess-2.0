import { Types } from "../../Board/Piece/types";

export type Move = {
    alpha: number,
    index: number
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
    downsideRight: {
        alpha: 1,
        index: -1,
    },
    downsideLeft: {
        alpha: -1,
        index: -1,
    },
};

export const MovesDirectionsHorizontalVertical = ():Array<Move> => {
    const front = {
        alpha: 0,
        index: 1,
    };
    const down = {
        alpha: 0,
        index: -1,
    };
    const left = {
        alpha: -1,
        index: 0,
    };
    const right = {
        alpha: 1,
        index: 0,
    };
    return [front, down, left, right];
};

export const MovesDirectionsDiagonal = ():Array<Move> => {
    const frontsideRight = {
        alpha: 1,
        index: 1,
    };
    const frontsideLeft = {
        alpha: -1,
        index: 1,
    };
    const downsideRight = {
        alpha: 1,
        index: -1,
    };
    const downsideLeft = {
        alpha: -1,
        index: -1,
    };
    return [frontsideRight, frontsideLeft, downsideLeft, downsideRight];
};

const buildMove = (pieceType: Types):Array<Move> => {
    const moves = new Array<Move>();
    switch (pieceType) {
    case Types.Bishop:
        for (let i = 1; i <= 7; i++) {
            MovesDirectionsDiagonal().forEach(direction => {
                moves.push({
                    alpha: i * direction.alpha,
                    index: i * direction.index,
                });
            });
        }
        break;
    case Types.Tower:
        for (let i = 1; i <= 7; i++) {
            MovesDirectionsHorizontalVertical().forEach(direction => {
                moves.push({
                    alpha: i * direction.alpha,
                    index: i * direction.index,
                });
            });
        }
        break;
    case Types.Queen:
        for (let i = 1; i <= 7; i++) {
            MovesDirectionsHorizontalVertical().forEach(direction => {
                moves.push({
                    alpha: i * direction.alpha,
                    index: i * direction.index,
                });
            });
            MovesDirectionsDiagonal().forEach(direction => {
                moves.push({
                    alpha: i * direction.alpha,
                    index: i * direction.index,
                });
            });
        }
        break;
    case Types.Horse: {
        let stepIndex = 2;
        let stepAlpha = 1;
        
        MovesDirectionsDiagonal().forEach(direction => {
            moves.push({
                alpha: stepAlpha * direction.alpha,
                index: stepIndex * direction.index,
            });
        });

        stepIndex = 1;
        stepAlpha = 2;

        MovesDirectionsDiagonal().forEach(direction => {
            moves.push({
                alpha: stepAlpha * direction.alpha,
                index: stepIndex * direction.index,
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