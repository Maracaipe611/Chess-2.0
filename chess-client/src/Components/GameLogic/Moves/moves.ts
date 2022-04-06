import { Types } from "../../Piece/types";
import { Coordinate } from "../../../client/Board/types";

export enum MoveDirections {
    "Front",
    "Down",
    "Left",
    "Right",
    "FrontsideLeft",
    "FrontsideRight",
    "DownsideLeft",
    "DownsideRight",
}

export interface Move extends Coordinate{
    direction: MoveDirections,
}

export const CommonMoves: { [moveName: string]: Move } = {
  front: {
    alpha: 0,
    index: 1,
    direction: MoveDirections.Front,
  },
  down: {
    alpha: 0,
    index: -1,
    direction: MoveDirections.Down,
  },
  left: {
    alpha: -1,
    index: 0,
    direction: MoveDirections.Left,
  },
  right: {
    alpha: 1,
    index: 0,
    direction: MoveDirections.Right,
  },
  doubleFront: {
    alpha: 0,
    index: 2,
    direction: MoveDirections.Front,
  },
  doubleLeft: {
    alpha: -2,
    index: 0,
    direction: MoveDirections.Left,
  },
  doubleRight: {
    alpha: 2,
    index: 0,
    direction: MoveDirections.Right,
  },
  frontsideRight: {
    alpha: 1,
    index: 1,
    direction: MoveDirections.DownsideRight,
  },
  frontsideLeft: {
    alpha: -1,
    index: 1,
    direction: MoveDirections.FrontsideLeft,
  },
};

export const MovesDirectionsHorizontalVertical = ():Array<Move> => {
  const front = {
    alpha: 0,
    index: 1,
    direction: MoveDirections.Front,
  };
  const down = {
    alpha: 0,
    index: -1,
    direction: MoveDirections.Down,
  };
  const left = {
    alpha: -1,
    index: 0,
    direction: MoveDirections.Left,
  };
  const right = {
    alpha: 1,
    index: 0,
    direction: MoveDirections.Right,
  };
  return [front, down, left, right];
};

export const MovesDirectionsDiagonal = ():Array<Move> => {
  const frontsideRight = {
    alpha: 1,
    index: 1,
    direction: MoveDirections.FrontsideRight,
  };
  const frontsideLeft = {
    alpha: -1,
    index: 1,
    direction: MoveDirections.FrontsideLeft,
  };
  const downsideRight = {
    alpha: 1,
    index: -1,
    direction: MoveDirections.DownsideRight,
  };
  const downsideLeft = {
    alpha: -1,
    index: -1,
    direction: MoveDirections.DownsideLeft,
  };
  return [frontsideRight, frontsideLeft, downsideLeft, downsideRight];
};

const buildMove = (pieceType: Types):Array<Move> => {
  let moves = new Array<Move>();
  switch (pieceType) {
  case Types.Pawn:
    moves = [CommonMoves.front,
      CommonMoves.doubleFront,
      CommonMoves.frontsideLeft,
      CommonMoves.frontsideRight];
    break;
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
  case Types.King:
    MovesDirectionsDiagonal().forEach(move => {
      moves.push({
        alpha: move.alpha,
        index: move.index,
        direction: move.direction,
      });
    });
    moves = moves.concat(CommonMoves.front,
      CommonMoves.down,
      CommonMoves.left,
      CommonMoves.right,
      CommonMoves.doubleLeft,
      CommonMoves.doubleRight);
        
    break;
  default:
    break;
  }
  return moves;
};

export const PieceMoves = () => {
    
  const Pawn = buildMove(Types.Pawn);
  const Horse = buildMove(Types.Horse);
  const Tower = buildMove(Types.Tower);
  const Bishop = buildMove(Types.Bishop);
  const Queen = buildMove(Types.Queen);
  const King = buildMove(Types.King);

  return [
    Pawn,
    Tower,
    Horse,
    Bishop,
    Queen,
    King,
  ];
};