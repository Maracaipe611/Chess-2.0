import React, { useCallback, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import Player from "../../Player/types";
import { BoardBuilder } from "../House/service";
import House from "../House/types";
import { Piece } from "../Piece/types";
import { Colors } from "../types";

type GameContextProviderProps = {
    children: React.ReactNode;
};

type GameContextProps = {
    player: Player;
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
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
    setAbleHousesToMove: React.Dispatch<React.SetStateAction<Array<House>>>;
};

export const GameContext = createContext<GameContextProps | undefined>(
    undefined
);

const whitePlayer:Player = new Player(
    "Lucas",
    Colors.White,
    false,
);

export const GameContextProvider:React.FC<GameContextProviderProps> = ({ children }) => {
    const [player, setPlayer] = useState<Player>(whitePlayer);
    const [selectedHouse, setSelectedHouse] = useState<House>();
    const [boardHouses, setBoardHouses] = useState<Array<House>>(BoardBuilder(player));
    const [boardPieces, setBoardPieces] = useState<Array<Piece>>([]);
    const [movementHistory, setMovementHistory] = useState<Array<Piece>>([]);
    const [dangerousHouses, setDangerousHouses] = useState<Array<House>>([]);
    const [ableHousesToMove, setAbleHousesToMove] = useState<Array<House>>([]);

    useEffect(() => {
        if (!boardPieces.length) return;
        setBoardHouses(BoardBuilder(player, boardPieces)); //se caso mude o jogador, a perspectiva do jogo deve mudar. Porém as peças não.
    }, [player]);
    
    useEffect(() => {
        const allLivePieces:Array<Piece> = new Array<Piece>();
        boardHouses.forEach(house => {
            if(house.piece) {
                allLivePieces.push(house.piece);
            }
        });
        setBoardPieces(allLivePieces);
    }, [boardHouses]);

    const providerValue = useCallback((): GameContextProps => {
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
            setAbleHousesToMove,
        };
    }, [player, setPlayer, selectedHouse, setSelectedHouse, boardHouses, setBoardHouses, boardPieces, setBoardPieces,
        movementHistory, setMovementHistory, dangerousHouses, setDangerousHouses, ableHousesToMove, setAbleHousesToMove]);

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
