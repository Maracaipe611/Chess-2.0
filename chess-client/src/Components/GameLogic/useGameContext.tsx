import React, { useCallback, useContext } from "react";
import { createContext, useState } from "react";
import Player from "../Player/types";
import House from "../House/types";
import { Match } from "../../client/Board/types";

type GameContextProviderProps = {
  children: React.ReactNode;
};

type GameContextProps = {
  match: Match | undefined;
  setMatch: React.Dispatch<React.SetStateAction<Match | undefined>>;
  player: Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  selectedHouse: House | undefined;
  setSelectedHouse: React.Dispatch<React.SetStateAction<House | undefined>>;
  ableHousesToMove: Array<House>;
  setAbleHousesToMove: React.Dispatch<React.SetStateAction<Array<House>>>;
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameContextProvider: React.FC<GameContextProviderProps> = ({ children }) => {
  const [match, setMatch] = useState<Match | undefined>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<House>();
  const [ableHousesToMove, setAbleHousesToMove] = useState<Array<House>>([]);
  const [connected, setConnected] = useState(false);

  const providerValue = useCallback((): GameContextProps => {
    return {
      match,
      setMatch,
      player,
      setPlayer,
      selectedHouse,
      setSelectedHouse,
      ableHousesToMove,
      setAbleHousesToMove,
      connected,
      setConnected,
    };
  }, [match, setMatch,
    player, setPlayer,
    selectedHouse, setSelectedHouse,
    ableHousesToMove, setAbleHousesToMove,
    connected, setConnected]);

  return (
    <GameContext.Provider value={providerValue()}>
      {children}
    </GameContext.Provider>
  );
};

export function useGameContext(): GameContextProps {
  const context = useContext(GameContext);
  if (!context) {
    // if the context is not defined, maybe the reason is that the context have circular dependency
    throw new Error("Game context not found");
  }

  return context;
}
