import React, { useCallback } from "react";
import "./House.css";
import House from "./types";
import PieceComponent from "../Piece/Piece";
import { useGameLogic } from "../GameLogic/useGameLogic";
import { useGameContext } from "../GameLogic/context";
import { Actions } from "../Player/types";

interface HouseComponentProps {
  house: House;
}

const HouseComponent: React.FC<HouseComponentProps> = ({ house }) => {
  const { ableHousesToMove, selectedHouse, player } = useGameContext();
  const { houseHandler } = useGameLogic();

  const houseStyle = useCallback((): string => {
    const classNames: Array<string> = ["house"];
    const selected = "selectedHouse";
    const thePieceHereIsInDangerous = "prey";
    const otherPieceWantsToGetHere = "ableToReceive";

    if (house === selectedHouse) {
      classNames.push(selected);
      return classNames.join(" ");
    }
    if (!house.piece && ableHousesToMove.includes(house)) classNames.push(otherPieceWantsToGetHere);

    /* if ((house.piece && house.piece.color === player.enemyColor()) && (house.checkIfHouseIsOnThisArray(dangerousHouses) && player.canViewPossibleEnemyMoves
        || house.checkIfHouseIsOnThisArray(ableHousesToMove))) classNames.push(thePieceHereIsInDangerous); */

    return classNames.join(" ");
  }, [ableHousesToMove, selectedHouse, player, house]);

  const action = (): Actions => {
    let userAction;
    if (selectedHouse === house) return userAction = !house.piece?.isFriend(player) ? Actions.UnselectEnemy : Actions.Unselect;
    if (!house.piece) {
      ableHousesToMove.includes(house) ?
        userAction = Actions.NoPieceAndMove :
        userAction = Actions.NoPiece;
    } else {
      if (house.piece.isFriend(player)) {
        selectedHouse === house ?
          userAction = Actions.Unselect :
          userAction = Actions.FriendlyPiece;
      } else {
        ableHousesToMove.includes(house) ?
          userAction = Actions.EnemyPieceAndEat :
          userAction = Actions.EnemyPiece;
      }
    }
    return userAction;
  };

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