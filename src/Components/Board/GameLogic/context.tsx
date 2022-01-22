import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { Player } from "../../Player/types";
import { AllHouses } from "../House/service";
import House from "../House/types";
import { Piece } from "../Piece/types";

type GameContextProviderProps = {
    children: React.ReactNode;
};

type GameContextProps = {
    player: Player | undefined;
    setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;
    selectedHouse: House | undefined;
    setSelectedHouse: React.Dispatch<React.SetStateAction<House | undefined>>;
    boardHouses: Array<House>;
    setBoardHouses: React.Dispatch<React.SetStateAction<Array<House>>>;
    boardPieces: Array<Piece>;
    setBoardPieces: React.Dispatch<React.SetStateAction<Array<Piece>>>;
    movementHistory: Array<Piece>;
    setMovementHistory: React.Dispatch<React.SetStateAction<Array<Piece>>>;
    dangerousHouses: Array<House>;
    setDangerousHouses: React.Dispatch<React.SetStateAction<Array<House>>>;
    ableHousesToMove: Array<House>;
    setHousesAbleToMove: React.Dispatch<React.SetStateAction<Array<House>>>;
};

export const GameContext = createContext<GameContextProps | undefined>(
    undefined
);

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
    const [player, setPlayer] = useState<Player>();
    const [selectedHouse, setSelectedHouse] = useState<House>();
    const [boardHouses, setBoardHouses] = useState<Array<House>>(AllHouses);
    const [boardPieces, setBoardPieces] = useState<Array<Piece>>([]);
    const [movementHistory, setMovementHistory] = useState<Array<Piece>>([]);
    const [dangerousHouses, setDangerousHouses] = useState<Array<House>>([]);
    const [ableHousesToMove, setHousesAbleToMove] = useState<Array<House>>([]);

    useEffect(() => {
        const allLivePieces:Array<Piece> = new Array<Piece>();
        boardHouses.forEach(house => {
            if(house.piece) {
                allLivePieces.push(house.piece);
            }
        });
        setBoardPieces(allLivePieces);
    }, [boardHouses]);

    const providerValue = (): GameContextProps => {
        return {
            player,
            setPlayer,
            selectedHouse,
            setSelectedHouse,
            boardHouses,
            setBoardHouses,
            boardPieces,
            setBoardPieces,
            movementHistory,
            setMovementHistory,
            dangerousHouses,
            setDangerousHouses,
            ableHousesToMove,
            setHousesAbleToMove,
        };
    };

    return (
        <GameContext.Provider value={providerValue()}>
            {children}
        </GameContext.Provider>
    );
};

export function useGameContext(): GameContextProps {
    const context = useContext(GameContext);
    if (!context) throw new Error("Game context not found");

    return context;
}
