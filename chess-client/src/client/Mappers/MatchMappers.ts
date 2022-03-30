import { Move } from "../../Components/GameLogic/Moves/moves";
import House from "../../Components/House/types";
import { Piece } from "../../Components/Piece/types";
import Player from "../../Components/Player/types";
import { Colors, Match } from "../Board/types";
import { MatchDTO, MoveDTO, PieceDTO, PlayerDTO, SquareDTO } from "../MatchClient/types";

const createNewMatchDTO = (playerName: string, reference: string): MatchDTO => (
  {
    board: null,
    players: [{ color: Colors.Black, name: playerName }],
    reference: reference,
  }
);

const mapMatchDTO = (matchDto: MatchDTO): Match | null => {
  if (!matchDto.board || !matchDto.players || !matchDto.id) return null;
  const houses: Array<House> = mapHousesDTO(matchDto.board);
  const players = mapPlayerDTO(matchDto.players);

  return new Match(matchDto.id, houses, players, matchDto.reference);

};

const mapHousesDTO = (houses: Array<SquareDTO>): Array<House> => {
  return houses.map(house => new House(
    house.coordinate,
    house.color,
    mapPieceDTO(house?.piece),
  ));
};

const mapPieceDTO = (piece: PieceDTO | undefined): Piece | undefined => {
  if (!piece) return undefined;
  return new Piece(
    piece.id,
    piece.type,
    piece.coordinate,
    piece.color,
    mapPieceMoveDTO(piece.move),
  );
};

const mapPieceMoveDTO = (pieceMove: Array<MoveDTO>): Array<Move> => {
  return pieceMove.map(m => {
    const move: Move = {
      alpha: m.coordinate.alpha,
      index: m.coordinate.index,
      direction: m.direction,
    };
    return move;
  });
};

const mapPlayerDTO = (playerDto: Array<PlayerDTO>): Player[] => {
  return playerDto.map(player => {
    if (!player.id) throw Error("Player not found");
    return new Player(
      player.id,
      player.name,
      player.color,
    );
  });
};

export {
  createNewMatchDTO,
  mapMatchDTO,
  mapHousesDTO,
  mapPieceDTO,
  mapPieceMoveDTO,
  mapPlayerDTO,
};