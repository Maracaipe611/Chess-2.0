import axios from "axios";
import { useCallback } from "react";
import House from "../../Components/House/types";
import { Piece } from "../../Components/Piece/types";
import { Colors, Match } from "../../client/Board/types";
import { Move } from "../../Components/GameLogic/Moves/moves";
import Player from "../../Components/Player/types";
import { MatchDTO } from "./types";

const useMatchClient = () => {
  const baseURL = `${process.env.REACT_APP_LOCAL_URL_API}/Match/`;

  const mapMatch = (response: any) => {
    const matchDto: MatchDTO = response.data;
    if (!matchDto.board || !matchDto.players || !matchDto.id)
      throw Error("Something goes wrong on build match");
    const houses: Array<House> = matchDto.board.map(house => {
      return new House(
        house.coordinate,
        house.color,
        house.piece ? new Piece(
          house?.piece.id,
          house.piece.type,
          house.piece.coordinate,
          house.piece.color,
          house.piece.move.map(m => {
            const move: Move = {
              alpha: m.coordinate.alpha,
              index: m.coordinate.index,
              direction: m.direction,
            };
            return move;
          })
        ) : undefined
      );
    });

    const players: Array<Player> = matchDto.players.map(player => {
      if(!player.id) throw Error("Player not found");
      return new Player(
        player.id,
        player.name,
        player.color,
      );
    });

    const match = new Match(matchDto.id, houses, players, matchDto.reference);
    return match;
  };

  const getMatch = useCallback((reference: string): Promise<any> => new Promise(
    (resolve, reject) => {
      axios.get(reference, { baseURL }).then((response: any) => {
        const match = mapMatch(response);
        resolve(match);
      }, (response: any) => reject(response));
    }, 
  ), [baseURL]);

  const createMatch = useCallback((reference: string, playerName: string): Promise<any> => new Promise(
    (resolve, reject) => {
      const matchDto:MatchDTO = {
        board: null,
        players: [{ color: Colors.Black, name: playerName }],
        reference: reference,
      };

      axios.post("", matchDto, { baseURL }).then((response: any) => {
        const match = mapMatch(response);
        resolve(match);
      }, (response: any) => reject(response));
    }, 
  ), [baseURL]);

  return useCallback(() => ({
    getMatch,
    createMatch,
  }), [
    getMatch,
    createMatch,
  ]);
};

export default useMatchClient;