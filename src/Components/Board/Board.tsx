import React from "react";
import { AllHouses } from "./House/context";
import { House } from "./House";

type Player = {
    color: string,
    tableDeg: string,
    pieceDeg: string,
};

const jogadorDefault: Player = { color: "White", tableDeg: "270", pieceDeg: "90" };
const Board:React.FC  = ()=> {
    return (
        <div style={{ width: 480, minWidth: 480, display: "inline-flex", justifyContent: "center", flexWrap: "wrap", rotate: `${jogadorDefault.tableDeg}deg` }} >
            {
                AllHouses.map(house => <House house={house} player={jogadorDefault} key={house.coordinate.alpha + house.coordinate.index.toString()} />)
            }
        </div>
    )
}

export default Board;