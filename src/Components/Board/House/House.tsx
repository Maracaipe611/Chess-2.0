import House from "../House/types";
import PieceComponent from "../Piece/Piece";
import { useGameLogic } from "../GameLogic/moves";
import { useGameContext } from "../GameLogic/context";

type HouseComponentProps = {
    house: House,
}

const HouseComponent = ({ house }: HouseComponentProps) => {
    const { dangerousHouses } = useGameContext();
    const { houseHandler } = useGameLogic();
    return (
        <div style={{
            backgroundImage: `url(${house.src})`,
            width: 60,
            height: 60,
            display: "inline-block",
            cursor: house.piece ? "pointer" : "unset",
            backgroundColor: house.isAbleToReceivePieces(dangerousHouses) ? "green" : undefined, 
        }}
        id={house.getCurrentPosition()}
        onClick={() => house.piece !== undefined ? houseHandler(house) : null}
        >
            {
                house.piece ?
                    <PieceComponent piece={house.piece} />
                    :
                    null
            }
        </div>
    );
};

export default HouseComponent;