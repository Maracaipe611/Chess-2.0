import { Piece } from "./types";

type PieceComponentProps = {
    piece: Piece,
}

const PieceComponent = ({piece}: PieceComponentProps) => {
    return (
        <img style={{ width: "max-content", height: "max-content", display: "block" }}
            src={piece.src}
            alt={piece.type}
            id={piece.type + piece.getCurrentPosition()}
            key={piece.getCurrentPosition()} />
    )
};

export default PieceComponent;