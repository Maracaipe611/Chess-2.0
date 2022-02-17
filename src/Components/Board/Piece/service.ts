import { AlphPositions, Piece, Types } from "./types";
import { Move, PieceMoves } from "../../GameLogic/Moves/moves";
import { Colors } from "../types";

function BuildSinglePiece(type: Types, color: Colors): Array<Piece> {
    const { A, B, C, D, E, F, G, H } = AlphPositions;
    const [Pawn, Tower, Horse, Bishop, Queen, King] = PieceMoves();

    const communPiecesIndex = color === Colors.Black ? 8 : 1;
    const pawnIndex = color === Colors.Black ? 7 : 2;

    const pawnsAlphs = [A, B, C, D, E, F, G, H];
    const towerAlphs = [A, H];
    const horseAlphs = [B, G];
    const bishopAlphs = [C, F];
    const queenAlph = color === Colors.Black ? [D] : [E];
    const kingAlph = color === Colors.Black ? [E] : [D];

    const imageSourcePrefix: string = "./Images/Chess" + (color === Colors.Black ? Colors.Black : Colors.White);
    const imageSourceSufix = ".png";
    const imageSource = imageSourcePrefix + type + imageSourceSufix;

    let currentPieceAlphs: Array<AlphPositions> = new Array<AlphPositions>();
    const currentIndex = type === Types.Pawn ? pawnIndex : communPiecesIndex;

    let moves: Array<Move>;

    switch (type) {
    case Types.Pawn:
        currentPieceAlphs = pawnsAlphs;
        moves = Pawn;
        break;
    case Types.Tower:
        currentPieceAlphs = towerAlphs;
        moves = Tower;
        break;
    case Types.Horse:
        currentPieceAlphs = horseAlphs;
        moves = Horse;
        break;
    case Types.Bishop:
        currentPieceAlphs = bishopAlphs;
        moves = Bishop;
        break;
    case Types.Queen:
        currentPieceAlphs = queenAlph;
        moves = Queen;
        break;
    case Types.King:
        currentPieceAlphs = kingAlph;
        moves = King;
        break;
    }

    return currentPieceAlphs.map((alph) => {
        return new Piece(
            type + color + alph + currentIndex,
            type,
            {
                alpha: alph,
                index: currentIndex,
            },
            color,
            imageSource,
            moves,
        );
    });
}

function PiecesByColor(color: Colors) {
    const king: Array<Piece> = BuildSinglePiece(Types.King, color);
    const queen: Array<Piece> = BuildSinglePiece(Types.Queen, color);
    const bishop: Array<Piece> = BuildSinglePiece(Types.Bishop, color);
    const horse: Array<Piece> = BuildSinglePiece(Types.Horse, color);
    const towers: Array<Piece> = BuildSinglePiece(Types.Tower, color);
    const pawns: Array<Piece> = BuildSinglePiece(Types.Pawn, color);

    return [king, queen, bishop, horse, towers, pawns].flatMap(pieces => pieces);
}

export function BuildAllPieces() {

    const WhitePieces: Array<Piece> = PiecesByColor(Colors.White);
    const BlackPieces: Array<Piece> = PiecesByColor(Colors.Black);

    return [WhitePieces, BlackPieces].flatMap(allPieces => allPieces);
}