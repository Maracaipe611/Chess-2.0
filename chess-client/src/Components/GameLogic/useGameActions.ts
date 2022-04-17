import { useCallback } from "react";
import useBoardClient from "../../client/Board/useBoardClient";
import House from "../House/types";
import { Actions } from "../Player/types";
import { useGameContext } from "./useGameContext";

export const useGameActions = () => {
  const {
    selectedHouse, setSelectedHouse,
    player,
    ableHousesToMove, setAbleHousesToMove,
    match, } = useGameContext();

  const { sendMove } = useBoardClient();

  const houseHandler = useCallback((house: House, action: Actions) => {
    if (!match) throw Error("Match not found");
    if (!player) throw Error("Player not found");
    switch (action) {
    case Actions.Unselect:
      setSelectedHouse(undefined);
      setAbleHousesToMove([]);
      break;
    case Actions.SelectFriendlyPiece:
      if (!house.piece?.housesToMove) return;
      setSelectedHouse(house);
      setAbleHousesToMove(findHousesByIds(house.piece.housesToMove));
      break;
    case Actions.SelectEnemyPiece:
      setSelectedHouse(house);
      setAbleHousesToMove([]);
      break;
    case Actions.MovePiece:
    case Actions.EatEnemyPiece:
      if (!selectedHouse) return; //if there is no selected house, do nothing
      if (match.turn !== player.color) return; //if is not players turn, do nothing
      sendMove(selectedHouse, house);
      break;
    default:
      break;
    }
  }, [match, player, selectedHouse, ableHousesToMove, setAbleHousesToMove, sendMove, setSelectedHouse, useBoardClient]);

  const findHousesByIds = (housesIds: Array<string>): Array<House> => {
    const board = match?.board;
    if (!board) throw new Error("Board not found");

    const houses = new Array<House>();
    housesIds.forEach(houseId => {
      board.map(house => {
        if (house.id === houseId) {
          houses.push(house);
        }
      });
    });
    return houses;
  };

  return { houseHandler };
};

