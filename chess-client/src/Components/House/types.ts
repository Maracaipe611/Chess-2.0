import Player from "../Player/types";
import { Piece, Types } from "../Piece/types";
import { Alphabet, Colors, Coordinate } from "../../client/Board/types";

export default class House {
  id: string;
  coordinate: Coordinate;
  color: Colors;
  piece?: Piece | undefined;
  imageSource: string;

  constructor(coordinate: Coordinate, color: Colors, piece: Piece | undefined) {
    this.id = coordinate.alpha.toString() + coordinate.index.toString();
    this.coordinate = coordinate;
    this.color = color;
    this.piece = piece;
    this.imageSource = this.setBackgroundImage();
  }

  setBackgroundImage(): string {
    const imageSourcePrefix = "./Images/";
    const imageSourceSufix = ".jpg";
    const imageSource = imageSourcePrefix + (this.color === Colors.White ? "lightWoodenHouse" : "woodenHouse") + imageSourceSufix;
    return imageSource;
  }

  currentPosition(): string {
    return Alphabet[this.coordinate.alpha - 1] + this.coordinate.index.toString();
  }

  checkIfHouseIsOnThisArray(sampleArray: Array<House>): boolean {
    return !!sampleArray.find(house => this.currentPosition() === house.currentPosition());
  }

  pseudoPawn(movementHistory: Array<Piece>, player: Player): Piece | undefined {
    //Logica do El Passant: Se o peão inimigo se movimentar para duas casas adiante em seu primeiro movimento...
    //... caso haja um peão inimigo na quinta casa (se ele for preto) || na quarta casa (se ele for branco), ou seja, em paralelo a ele...
    //...o peão aliado pode comer o peão inimigo...
    //... se movimentando para a casa traseira do peão inimigo (index - 1)
    const lastPiece = movementHistory[movementHistory.length - 1];
    if (!lastPiece
      || lastPiece.type !== Types.Pawn
      || lastPiece.howManyTimesMoved(movementHistory) !== 1
      || lastPiece.color === player.color) return undefined;

    const lastMovementWasDoubleFront = lastPiece.coordinate.index === 4 || lastPiece.coordinate.index === 5; //independente dar cor, se for o primeiro movimento e ele parar no meio, é pq foi doublefront

    //check if actually house is the trail of last pawn
    if (!lastMovementWasDoubleFront
      || (this.coordinate.index !== lastPiece.coordinate.index - player.direction(lastPiece.color === player.color))
      || (this.coordinate.alpha !== lastPiece.coordinate.alpha)) return undefined;

    return lastPiece;
  }
}