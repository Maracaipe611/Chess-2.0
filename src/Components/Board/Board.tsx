import React, { useContext } from "react";
import { HousesContext } from "./House/context";
import { House } from "./House";

const Board: React.FC = () => {
    
    const AllHouses = useContext(HousesContext);

    return (
        <div style={{ width: 480, minWidth: 480, display: "inline-flex", justifyContent: "center", flexWrap: "wrap" }} >
            {
                AllHouses.map(house => <House house={house} key={house.getCurrentPosition()} />)
            }
        </div>
    )
}

export default Board;