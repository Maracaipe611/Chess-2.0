import House from "../House/types";
import PieceComponent from "../Piece/Piece";
import { useGameLogic } from "../GameLogic/moves";
import { useGameContext } from "../GameLogic/context";
import "./House.css";

type HouseComponentProps = {
    house: House;
};

const HouseComponent = ({ house }: HouseComponentProps) => {
    const { ableHousesToMove, selectedHouse, dangerousHouses } = useGameContext();
    const { houseHandler } = useGameLogic();

    const houseStyle = (): string => {
        const normal = "";
        const selected = "selectedHouse";
        const thePieceHereIsInDangerous = "prey";
        const otherPieceWantsToGetHere = "ableToReceive";

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
                backgroundImage: `url(${house.src})`,
                cursor: house.piece ? "pointer" : "unset",
            }}
            id={house.getCurrentPosition()}
            onClick={() => houseHandler(house)}
        >
            {house.piece ? <PieceComponent piece={house.piece} /> : null}
        </div>
    );
};

export default HouseComponent;
