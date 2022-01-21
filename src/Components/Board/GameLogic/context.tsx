import { useContext } from "react";
import { createContext, useState } from "react";
import { AllHouses } from "../House/service";
import House from "../House/types";
import { Piece } from "../Piece/types";

type GameContextProviderProps = {
    children: React.ReactNode,
};

type GameContextProps = {
    boardHouses: Array<House>,
    setBoardHouses: React.Dispatch<React.SetStateAction<Array<House>>>,
    boardPieces: Array<Piece>,
    setBoardPieces: React.Dispatch<React.SetStateAction<Array<Piece>>>
    movementHistory: Array<Piece>,
    setMovementHistory: React.Dispatch<React.SetStateAction<Array<Piece>>>
    dangerousHouses: Array<House>,
    setDangerousHouses: React.Dispatch<React.SetStateAction<Array<House>>>,
};

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameContextProvider = ({
    children
}: GameContextProviderProps) => {
    const [boardHouses, setBoardHouses] = useState<Array<House>>(AllHouses);
    const [boardPieces, setBoardPieces] = useState<Array<Piece>>(boardHouses.filter(house => house.piece).map(house => house.piece!));
    const [movementHistory, setMovementHistory] = useState<Array<Piece>>([]);
    const [dangerousHouses, setDangerousHouses] = useState<Array<House>>([]);

    
    return (
        <GameContext.Provider value={{
            boardHouses,
            setBoardHouses,
            boardPieces,
            setBoardPieces,
            movementHistory,
            setMovementHistory,
            dangerousHouses,
            setDangerousHouses,
        }}>
            {children}
        </GameContext.Provider>
    );
};

export function useGameContext():GameContextProps {
    const context = useContext(GameContext);
    console.log(context)
    if (!context) throw new Error('deu rui');

    return context;
}