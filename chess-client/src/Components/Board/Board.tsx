import { useCallback } from "react";
import { Colors } from "../../client/Board/types";
import { useGameContext } from "../GameLogic/useGameContext";
import { HouseComponent } from "../House/index";
import House from "../House/types";
import { gameActions } from "../GameLogic/gameActions";
import "./Board.css";

const Board = () => {
  const { match, player } = useGameContext();
  const { houseHandler } = gameActions();

  const setRotateDirection = useCallback(() => {
    if (!player) throw Error("Player not found");
    const rotateDirection = player.color === Colors.White ? "rotate-Board-WhitePlayer" : "rotate-Board-BlackPlayer";
    return rotateDirection;

  }, [player]);

  const renderBoard = useCallback((board) => {
    return (
      <div
        style={{ display: "grid", placeItems: "center" }}
        className={`Board ${setRotateDirection()}`}
      >
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
              houseHandler={houseHandler}
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
