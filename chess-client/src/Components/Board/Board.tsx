import { useCallback, useEffect, useRef } from "react";
import { useGameContext } from "../GameLogic/context";
import { HouseComponent } from "../House/index";
import House from "../House/types";

const Board = () => {
  const { match } = useGameContext();

  const renderBoard = useCallback((board) => {
    return (
      <div style={{ display: "grid" }}>
        <div
          style={{
            width: 480,
            minWidth: 480,
            display: "inline-flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {board.map((house: House) => (
            <HouseComponent
              house={house}
              key={house.id}
            />
          ))}
        </div>
      </div>
    );
  }, [match]);

  if (!match || !match.board) return (<></>);
  return renderBoard(match.board);
};

export default Board;
