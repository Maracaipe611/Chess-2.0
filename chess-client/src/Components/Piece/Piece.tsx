import React from "react";
import { Piece } from "./types";

interface PieceComponentProps {
  piece: Piece,
}

const PieceComponent: React.FC<PieceComponentProps> = ({ piece }) => {
  return (
    <img style={{ width: "max-content", height: "max-content", display: "block" }}
      src={piece.imageSource}
      alt={piece.type.toString()}
      id={piece.type + piece.id}
      key={piece.id} />
  );
};

export default PieceComponent;