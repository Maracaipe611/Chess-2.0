import React, { useCallback } from "react";
import "./House.css";
import House from "./types";
import PieceComponent from "../Piece/Piece";
import { useGameContext } from "../GameLogic/useGameContext";
import { Actions } from "../Player/types";
import { Colors } from "../../client/Board/types";

interface HouseComponentProps {
  house: House;
  houseHandler: (house: House, action: Actions) => void;
}

const HouseComponent: React.FC<HouseComponentProps> = ({ house, houseHandler }) => {

  const { ableHousesToMove, selectedHouse, player } = useGameContext();

  const houseStyle = useCallback((): string => {
    const classNames: Array<string> = ["house"];
    const selected = "selectedHouse";
    const thePieceHereIsInDangerous = "prey";
    const otherPieceWantsToGetHere = "ableToReceive";

    if (player) {
      const rotateDirection = player.color === Colors.White ? "rotate-House-WhitePlayer" : "rotate-House-BlackPlayer";
      classNames.push(rotateDirection);
    }

    if (house === selectedHouse) {
      classNames.push(selected);
      return classNames.join(" ");
    }
    if (!house.piece && ableHousesToMove.includes(house)) classNames.push(otherPieceWantsToGetHere);
    if (player && house.piece && house.piece.color !== player.color && ableHousesToMove.includes(house)) classNames.push(thePieceHereIsInDangerous);

    return classNames.join(" ");
  }, [ableHousesToMove, selectedHouse, player, house]);

  const action = useCallback((): Actions => {
    if (!player) throw Error("Player not found");

    if (selectedHouse === house) {
      return Actions.Unselect;
    }
    if (!house.piece) {
      return ableHousesToMove.includes(house) ? Actions.MovePiece : Actions.NoPiece;
    }
    if (house.piece.isFriend(player)) {
      return selectedHouse === house ? Actions.Unselect : Actions.SelectFriendlyPiece;
    } else {
      return ableHousesToMove.includes(house) ? Actions.EatEnemyPiece : Actions.SelectEnemyPiece;
    }
  }, [ableHousesToMove, selectedHouse, player, house]);

  return (
    <div
      className={houseStyle()}
      style={{
        backgroundImage: `url(${house.imageSource})`,
        cursor: house.piece ? "pointer" : "unset",
      }}
      id={house.id}
      key={house.id}
      onClick={() => houseHandler(house, action())}
    >
      {house.piece ? <PieceComponent piece={house.piece} /> : null}
    </div>
  );
};

export default HouseComponent;
