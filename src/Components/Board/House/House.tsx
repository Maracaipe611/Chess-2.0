import House from "../House/types";
import PieceComponent from "../Piece/Piece";

type HouseComponentProps = {
    house: House,
}

const HouseComponent = ({ house }: HouseComponentProps) => {
    return (
        <div style={{
            backgroundImage: `url(${house.src})`,
            width: 60,
            height: 60,
            display: "inline-block",
            cursor: house.piece ? "pointer" : "unset",
            // backgroundColor: house.isAbleToReceivePieces ? "green" : undefined, 
        }}
            id={house.getCurrentPosition()}
        >
            {
                !!house.piece ?
                    <PieceComponent piece={house.piece} />
                    :
                    null
            }
        </div>
    )
};

export default HouseComponent;