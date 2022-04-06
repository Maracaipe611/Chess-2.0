import Player, { Actions } from "../../Components/Player/types";
import House from "../House/types";
import { Piece } from "../../Components/Piece/types";
import { useGameContext } from "./context";
import useBoardClient from "../../client/Board/useBoardClient";
import { Match } from "../../client/Board/types";
import { useEffect, useMemo } from "react";

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

    const { sendMove, connect } = useBoardClient();

    const houseHandler = (house: House, action: Actions) => {
        switch (action) {
            case Actions.FriendlyPiece:
            case Actions.EnemyPiece:
                if (!house.piece?.housesToMove) return;
                setSelectedHouse(house);
                setAbleHousesToMove(findHousesByIds(house.piece?.housesToMove));
                break;
            case Actions.MovePiece:
                if (!selectedHouse || !match) return;
                sendMove(selectedHouse, house);
                break;
            default:
                break;
        }
    };

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

