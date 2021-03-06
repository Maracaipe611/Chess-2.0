import House from "../House/types";
import { Colors, ColorsVerbose, Coordinate } from "../../client/Board/types";
import Player from "../Player/types";

export enum Types {
  Pawn,
  Tower,
  Horse,
  Bishop,
  Queen,
  King,
}

export enum AlphPositions {
  A = 1,
  B = 2,
  C = 3,
  D = 4,
  E = 5,
  F = 6,
  G = 7,
  H = 8,
}

export class Piece {
  id: string;
  type: Types;
  coordinate: Coordinate;
  color: Colors;
  imageSource: string;
  housesToMove: Array<string>;
  hasMovedBefore: boolean;

  constructor(id: string, type: Types, coordinate: Coordinate, color: Colors, housesToMove: Array<string>,) {
    this.id = id;
    this.type = type;
    this.coordinate = coordinate;
    this.color = color;
    this.imageSource = this.setBackgroundImage();
    this.housesToMove = housesToMove;
    this.hasMovedBefore = false;
  }

  setBackgroundImage(): string {
    const imageSourcePrefix: string = "./Images/Chess" + (this.color === Colors.Black ? ColorsVerbose.Black : ColorsVerbose.White);
    const imageSourceSufix = ".png";
    const imageSource = imageSourcePrefix + Types[this.type] + imageSourceSufix;
    return imageSource;
  }

  isAbleToChange(): boolean {
    return this.type === Types.Pawn;
  }

  hasMoved(movementHistory: Array<Piece>): boolean {
    return !!movementHistory.find(piece => piece.id === this.id);
  }

  howManyTimesMoved(movementHistory: Array<Piece>): number {
    return movementHistory.filter(piece => piece.id === this.id).length;
  }

  findHouse = (boardHouses: Array<House>): House | undefined => {
    return boardHouses.find(house => house.piece?.id === this.id);
  };

  isFriend = (player: Player): boolean => {
    return player.color === this.color;
  };
}