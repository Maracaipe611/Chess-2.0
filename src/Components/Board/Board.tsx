import React, { useEffect } from "react";
import { useGameContext } from "./GameLogic/context"
import { HouseComponent } from "./House/index";
import { Colors } from "./types";

const Board: React.FC = () => {
    
    const {boardHouses, setPlayer} = useGameContext();

    useEffect(() => {
        setPlayer({
            name: "lucas",
            color: Colors.White
        })
    }, [setPlayer])

    return (
        <div style={{ width: 480, minWidth: 480, display: "inline-flex", justifyContent: "center", flexWrap: "wrap" }} >
            {
                boardHouses.map(house => <HouseComponent house={house} key={house.getCurrentPosition()} />)
            }
        </div>
    )
}

export default Board;