import React, { useCallback, useState } from "react";
import "./House.css";
import House from "../House/types";
import PieceComponent from "../Piece/Piece";
import { useGameLogic } from "../../GameLogic/useGameLogic";
import { useGameContext } from "../../GameLogic/context";
import { Actions } from "../../Player/types";

interface HouseComponentProps {
    house: House;
}

const HouseComponent:React.FC<HouseComponentProps> = ({ house }) => {
    const { ableHousesToMove, selectedHouse, dangerousHouses, player } = useGameContext();
    const { houseHandler } = useGameLogic();

    const houseStyle = useCallback((): string => {
        const classNames:Array<string> = ["house"];
        const selected = "selectedHouse";
        const thePieceHereIsInDangerous = "prey";
        const otherPieceWantsToGetHere = "ableToReceive";

        // condicional para exibir EM VERMELHO casas inimigas onde o inimigo pode comer
        if (house.checkIfHouseIsOnThisArray(dangerousHouses) && player.canViewPossibleEnemyMoves) classNames.push(thePieceHereIsInDangerous); //temporario
        if (house === selectedHouse) {
            classNames.push(selected);
            return classNames.join(" ");
        } 
        if (!house.piece && house.checkIfHouseIsOnThisArray(ableHousesToMove)) classNames.push(otherPieceWantsToGetHere);
        if ((house.piece && house.piece.color === player.enemyColor()) && (house.checkIfHouseIsOnThisArray(dangerousHouses) && player.canViewPossibleEnemyMoves
        || house.checkIfHouseIsOnThisArray(ableHousesToMove))) classNames.push(thePieceHereIsInDangerous);

        return classNames.join(" ");
    }, [ableHousesToMove, selectedHouse, dangerousHouses, player, house]);

    const action = (): Actions => {
        let userAction;
        if(selectedHouse === house) return userAction = Actions.Unselect;
        if(!house.piece) {
            house.checkIfHouseIsOnThisArray(ableHousesToMove) ?
                userAction = Actions.NoPieceAndMove :
                userAction = Actions.NoPiece;
        }else {
            if(player.friendlyPiece(house.piece)) {
                selectedHouse === house ?
                    userAction = Actions.Unselect :
                    userAction = Actions.FriendlyPiece;
            } else {
                house.checkIfHouseIsOnThisArray(ableHousesToMove) ?
                    userAction = Actions.EnemyPieceAndEat :
                    userAction = Actions.EnemyPiece;
            }
        }
        return userAction;
    };

    return (
        <div
            className={ houseStyle() }
            style={{
                backgroundImage: `url(${house.imageSource})`,
                cursor: house.piece ? "pointer" : "unset",
            }}
            id={house.currentPosition()}
            onClick={() => houseHandler(house, action())}
        >
            { house.piece ? <PieceComponent piece={house.piece} /> : null }
        </div>
    );
};

export default HouseComponent;
