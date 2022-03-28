import { useGameContext } from "../GameLogic/context";
import { HouseComponent } from "../House/index";
import House from "../House/types";

const Board = () => {
  const { match } = useGameContext();
  if (!match || !match.board) return (<></>);
  return (
    match && match.board &&
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
            {match.board.map((house: House) => (
              <HouseComponent
                house={house}
                key={house.currentPosition()}
              />
            ))}
          </div>
        </div>
  );
};

export default Board;
