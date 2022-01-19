import React from "react";
import { Piece } from "./context";

type Player = {
    color: string,
    tableDeg: string,
    pieceDeg: string,
};

type PieceComponentProps = {
    piece: Piece,
    player: Player,
}

const PieceComponent = ({piece, player}: PieceComponentProps) => {
    return (
        <img style={{ width: "max-content", height: "max-content", display: "block", rotate: `${player.pieceDeg}deg` }}
            src={piece.src}
            alt={piece.type}
            key={piece.coordinate.alpha + piece.coordinate.index.toString()} />
    )
};

export default PieceComponent;