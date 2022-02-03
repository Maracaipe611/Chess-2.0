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
    const { ableHousesToMove, selectedHouse, dangerousHouses } = useGameContext();
    const { houseHandler } = useGameLogic();

    const houseStyle = (): string => {
        const normal = "";
        const selected = "selectedHouse";
        const thePieceHereIsInDangerous = "prey";
        const otherPieceWantsToGetHere = "ableToReceive";

        // condicional para exibir casas inimigas onde o inimigo pode comer
        if(house.checkIfHouseIsOnThisArray(dangerousHouses)) return thePieceHereIsInDangerous;

        if(!house.piece && house.checkIfHouseIsOnThisArray(ableHousesToMove)) {
            return otherPieceWantsToGetHere;
        } 
        if (house.piece && house.checkIfHouseIsOnThisArray(dangerousHouses)) {
            return thePieceHereIsInDangerous;
        }
        if (house === selectedHouse) {
            return selected;
        }
        
        return normal;
    };

    return (
        <div
            className={"house " + houseStyle()}
            style={{
                backgroundImage: `url(${house.imageSource})`,
                cursor: house.piece ? "pointer" : "unset",
            }}
            id={house.currentPosition()}
            onClick={() => houseHandler(house)}
        >
            {house.piece ? <PieceComponent piece={house.piece} /> : null}
        </div>
    );
};

export default HouseComponent;
