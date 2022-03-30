import React, { useCallback, useContext } from "react";
import { createContext, useState } from "react";
import Player from "../Player/types";
import House from "../House/types";
import { Colors, Match } from "../../client/Board/types";

type GameContextProviderProps = {
  children: React.ReactNode;
};

type GameContextProps = {
  match: Match | undefined;
  setMatch: React.Dispatch<React.SetStateAction<Match | undefined>>;
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  selectedHouse: House | undefined;
  setSelectedHouse: React.Dispatch<React.SetStateAction<House | undefined>>;
  ableHousesToMove: Array<House>;
  setAbleHousesToMove: React.Dispatch<React.SetStateAction<Array<House>>>;
  /* boardHouses: Array<House>;
  setBoardHouses: React.Dispatch<React.SetStateAction<Array<House>>>;
  boardPieces: Array<Piece>;
  setBoardPieces: React.Dispatch<React.SetStateAction<Array<Piece>>>;
  movementHistory: Array<Piece>;
  setMovementHistory: React.Dispatch<React.SetStateAction<Array<Piece>>>;
  dangerousHouses: Array<House>;
  setDangerousHouses: React.Dispatch<React.SetStateAction<Array<House>>>;
   */
};

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

const whitePlayer: Player = new Player(
  "aa",
  "Lucas",
  Colors.White,
);

export const GameContextProvider: React.FC<GameContextProviderProps> = ({ children }) => {
  const [match, setMatch] = useState<Match | undefined>();
  const [player, setPlayer] = useState<Player>(whitePlayer);
  const [selectedHouse, setSelectedHouse] = useState<House>();
  const [ableHousesToMove, setAbleHousesToMove] = useState<Array<House>>([]);
  /* const [boardHouses, setBoardHouses] = useState<Array<House>>(BoardBuilder(player));
    const [boardPieces, setBoardPieces] = useState<Array<Piece>>([]);
    const [movementHistory, setMovementHistory] = useState<Array<Piece>>([]);
    const [dangerousHouses, setDangerousHouses] = useState<Array<House>>([]);
     */

  /* useEffect(() => {
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
    }, [boardHouses]); */

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
      /* boardHouses,
            setBoardHouses,
            boardPieces,
            setBoardPieces,
            movementHistory,
            setMovementHistory,
            dangerousHouses,
            setDangerousHouses, */
    };
  }, [match, setMatch, player, setPlayer, selectedHouse, setSelectedHouse, ableHousesToMove, setAbleHousesToMove/* , boardHouses, setBoardHouses, boardPieces, setBoardPieces,
        movementHistory, setMovementHistory, dangerousHouses, setDangerousHouses */,]);

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
