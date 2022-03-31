import Player, { Actions } from "../../Components/Player/types";
import House from "../House/types";
import { Piece } from "../../Components/Piece/types";
import { useGameContext } from "./context";
import useBoardClient from "../../client/Board/useBoardClient";
import { Match } from "../../client/Board/types";

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

    const boardClient = useBoardClient();

    const houseHandler = (house: House, action: Actions) => {
        switch (action) {
            case Actions.FriendlyPiece:
            case Actions.EnemyPiece:
                if (!house.piece?.housesToMove) return;
                setSelectedHouse(house);
                setAbleHousesToMove(findHousesByIds(house.piece?.housesToMove));
                break;
            case Actions.MovePiece:
                const newMatch = movePiece();
                boardClient().sendMove(newMatch);
                break;
            default:
                break;
        }
    };

    const movePiece = (): Match => {
        const currentPiece = selectedHouse?.piece;
        if (!currentPiece || !match || !match.board) throw new Error("This is not an movement action");
        const newBoard = match.board.map(square => {
            if (square.id === selectedHouse.id) {
                square.piece = currentPiece;
            }
            return square;
        })
        let newMatch = match;
        newMatch.board = newBoard;
        return newMatch;
    }

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

