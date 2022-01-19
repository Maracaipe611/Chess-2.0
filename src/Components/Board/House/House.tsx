import House from "../House/context";
import PieceComponent from "../Piece/Piece";

type Player = {
    color: string,
    tableDeg: string,
    pieceDeg: string,
};

type HouseComponentProps = {
    house: House,
    player: Player,
}

const HouseComponent = ({house, player}: HouseComponentProps) => {
    return (
        <div style={{ backgroundImage: `url(${house.src})`, width: 60, height: 60, display: "inline-block"}}
        id={house.coordinate.alpha + house.coordinate.index.toString()}
        >
            {
                !!house.piece ?
                    <PieceComponent piece={house.piece} player={player}/>
                    :
                    null
            }
        </div>
    )
};

export default HouseComponent;