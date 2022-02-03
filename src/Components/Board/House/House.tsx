import React from "react";
import "./House.css";
import House from "../House/types";
import PieceComponent from "../Piece/Piece";
import { useGameLogic } from "../GameLogic/useGameLogic";
import { useGameContext } from "../GameLogic/context";

interface HouseComponentProps {
    house: House;
}

const HouseComponent:React.FC<HouseComponentProps> = ({ house }) => {
    const { ableHousesToMove, selectedHouse, dangerousHouses, player } = useGameContext();
    const { houseHandler } = useGameLogic();

    const houseStyle = (): string => {
        const selected = " selectedHouse";
        const thePieceHereIsInDangerous = " prey";
        const otherPieceWantsToGetHere = " ableToReceive";
        let classNames = "";

        // condicional para exibir EM VERMELHO casas inimigas onde o inimigo pode comer
        // if (house.checkIfHouseIsOnThisArray(dangerousHouses)) classNames = classNames + thePieceHereIsInDangerous; //temporario
        if (house === selectedHouse) return selected;
        if ((!house.piece && house.checkIfHouseIsOnThisArray(ableHousesToMove))) classNames = classNames +  otherPieceWantsToGetHere;
        if ((house.piece && house.piece.color === player?.enemyColor()) && (house.checkIfHouseIsOnThisArray(dangerousHouses) 
        || house.checkIfHouseIsOnThisArray(ableHousesToMove))) classNames = classNames +  thePieceHereIsInDangerous;

        return classNames;
    };

    return (
        <div
            className={"house" + houseStyle()}
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
