import { Actions } from "../../Components/Player/types";
import House from "../House/types";
import { useGameContext } from "./context";
import useBoardClient from "../../client/Board/useBoardClient";
import { useCallback } from "react";

export const useGameLogic = () => {
    const {
        setSelectedHouse, selectedHouse,
        player,
        ableHousesToMove, setAbleHousesToMove,
        match, setMatch,
    /* setBoardHouses, boardHouses,
        boardPieces,
        setDangerousHouses, dangerousHouses,
        setMovementHistory, movementHistory,
        setAbleHousesToMove, ableHousesToMove,  */ } = useGameContext();

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
    }, [match, player, selectedHouse, ableHousesToMove, setAbleHousesToMove, sendMove]);

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

