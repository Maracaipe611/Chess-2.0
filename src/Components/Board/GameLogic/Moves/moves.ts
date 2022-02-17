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

const buildMove = (direction: Move):Array<Move> => {
    const moves = new Array<Move>();
    switch (direction) {
    case CommonMoves.front:
        for (let index = 0; index <= 7; index++) {
            moves.push({
                alpha: 0,
                index: index
            });
        }
        break;
    case CommonMoves.down:
        for (let index = 0; index <= 7; index++) {
            moves.push({
                alpha: 0,
                index: -index
            });
        }
        break;
    case CommonMoves.right:
        for (let index = 0; index <= 7; index++) {
            moves.push({
                alpha: index,
                index: 0,
            });
        }
        break;
    case CommonMoves.left:
        for (let index = 0; index <= 7; index++) {
            moves.push({
                alpha: -index,
                index: 0,
            });
        }
        break;
    case CommonMoves.frontsideRight:
        for (let index = 0; index <= 7; index++) {
            moves.push({
                alpha: index,
                index: index,
            });
        }
        break;
    case CommonMoves.frontsideLeft:
        for (let index = 0; index <= 7; index++) {
            moves.push({
                alpha: -index,
                index: index,
            });
        }
        break;
    case CommonMoves.downsideRight:
        for (let index = 0; index <= 7; index++) {
            moves.push({
                alpha: index,
                index: -index,
            });
        }
        break;
    case CommonMoves.downsideLeft:
        for (let index = 0; index <= 7; index++) {
            moves.push({
                alpha: -index,
                index: -index,
            });
        }
        break;
    default:
        break;
    }
    return moves;
};

const buildHorseMoves = ():Array<Move> => {
    const stepIndex = 2;
    const stepAlpha = 1;
    const moves = new Array<Move>();

    moves.push({
        alpha: stepAlpha,
        index: stepIndex,
    });
    moves.push({
        alpha: stepAlpha,
        index: -stepIndex,
    });
    moves.push({
        alpha: -stepAlpha,
        index: stepIndex,
    });
    moves.push({
        alpha: -stepAlpha,
        index: -stepIndex,
    });
    
    return moves;
};

export const PieceMoves = () => {
    const Pawn = [
        CommonMoves.front,
        CommonMoves.doubleFront,
        CommonMoves.frontsideLeft,
        CommonMoves.frontsideRight,
    ];

    const Tower = [
        buildMove(CommonMoves.front),
        buildMove(CommonMoves.down),
        buildMove(CommonMoves.left),
        buildMove(CommonMoves.right),
    ].flatMap(moves => moves);

    const Horse = [
        buildHorseMoves()
    ].flatMap(moves => moves);

    const Bishop = [
        buildMove(CommonMoves.frontsideLeft),
        buildMove(CommonMoves.frontsideRight),
        buildMove(CommonMoves.downsideLeft),
        buildMove(CommonMoves.downsideRight),
    ].flatMap(moves => moves);

    const Queen = [
        buildMove(CommonMoves.front),
        buildMove(CommonMoves.down),
        buildMove(CommonMoves.left),
        buildMove(CommonMoves.right),
        buildMove(CommonMoves.frontsideLeft),
        buildMove(CommonMoves.frontsideRight),
        buildMove(CommonMoves.downsideLeft),
        buildMove(CommonMoves.downsideRight),
    ].flatMap(moves => moves);

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