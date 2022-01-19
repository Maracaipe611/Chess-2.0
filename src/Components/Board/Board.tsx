import React from "react";
import { AllPieces } from "./Piece/context";
import { AllHouses } from "./House/context";

const Board:React.FC  = ()=> {
    return (
        <div>
            {JSON.stringify(AllPieces)}
            --------------------------
            {JSON.stringify(AllHouses)}
        </div>
    )
}

export default Board;