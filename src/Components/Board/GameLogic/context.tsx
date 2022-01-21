import { useContext } from "react";
import { createContext, useState } from "react";
import { Player } from "../../Player/types";
import { AllHouses } from "../House/service";
import House from "../House/types";
import { Piece } from "../Piece/types";

type GameContextProviderProps = {
    children: React.ReactNode,
};

type GameContextProps = {
    player: Player | undefined,
    setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>,
    selectedPiece: Piece | undefined,
    setSelectedPiece: React.Dispatch<React.SetStateAction<Piece | undefined>>,
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
    const [player, setPlayer] = useState<Player>()
    const [selectedPiece, setSelectedPiece] = useState<Piece>();
    const [boardHouses, setBoardHouses] = useState<Array<House>>(AllHouses);
    const [boardPieces, setBoardPieces] = useState<Array<Piece>>(boardHouses.filter(house => house.piece).map(house => house.piece!));
    const [movementHistory, setMovementHistory] = useState<Array<Piece>>([]);
    const [dangerousHouses, setDangerousHouses] = useState<Array<House>>([]);

    
    return (
        <GameContext.Provider value={{
            player,
            setPlayer,
            selectedPiece,
            setSelectedPiece,
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
    if (!context) throw new Error('Game context not found');

    return context;
}