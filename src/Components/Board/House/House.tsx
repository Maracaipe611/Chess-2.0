import React, { useCallback } from "react";
import "./House.css";
import House from "../House/types";
import PieceComponent from "../Piece/Piece";
import { useGameLogic } from "../../GameLogic/useGameLogic";
import { useGameContext } from "../../GameLogic/context";

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
        if ((house.piece && house.piece.color === player?.enemyColor()) && (house.checkIfHouseIsOnThisArray(dangerousHouses) 
        || house.checkIfHouseIsOnThisArray(ableHousesToMove))) classNames.push(thePieceHereIsInDangerous);

        return classNames.join(" ");
    }, [ableHousesToMove, selectedHouse, dangerousHouses, player, house]);

    return (
        <div
            className={ houseStyle() }
            style={{
                backgroundImage: `url(${house.imageSource})`,
                cursor: house.piece ? "pointer" : "unset",
            }}
            id={house.currentPosition()}
            onClick={() => houseHandler(house)}
        >
            { house.piece ? <PieceComponent piece={house.piece} /> : null }
        </div>
    );
};

export default HouseComponent;
