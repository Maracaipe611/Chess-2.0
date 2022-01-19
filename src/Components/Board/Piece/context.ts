export enum Colors { White = "White", Black = "Black" };

export enum Types {
    Pawn = "Pawn",
    Tower = "Tower",
    Horse = "Horse",
    Bishop = "Bishop",
    Queen = "Queen",
    King = "King",
};

export type IndexPositions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export enum AlphPositions {
    "A" = 1,
    "B" = 2,
    "C" = 3,
    "D" = 4,
    "E" = 5,
    "F" = 6,
    "G" = 7,
    "H" = 8,
};

export type Coordinate = {
    alpha: AlphPositions,
    index: IndexPositions,
}

export class Piece {
    type: Types;
    coordinate: Coordinate;
    color: Colors;
    ableToChange: boolean;
    src: string;

    constructor(type: Types, coordinate: Coordinate, color: Colors, ableToChange: boolean, src: string) {
        this.type = type;
        this.coordinate = coordinate;
        this.color = color;
        this.ableToChange = ableToChange;
        this.src = src;
    };
};

const BuildPieces = (type: Types, color: Colors): Array<Piece> => {
    const { A, B, C, D, E, F, G, H } = AlphPositions;
    
    const communPiecesIndex = color === Colors.Black ? 8 : 1;
    const pawnIndex = color === Colors.Black ? 7 : 2;
    
    const pawnsAlphs = [A, B, C, D, E, F, G, H];
    const towerAlphs = [A, H];
    const horseAlphs = [B, G];
    const bishopAlphs = [C, F];
    const queenAlph = color === Colors.Black ? [D] : [E];
    const kingAlph = color === Colors.Black ? [E] : [D];
    
    const srcPrefix: string = "./Images/Chess" + (color === Colors.Black ? Colors.Black : Colors.White);
    const srcSufix: string = ".png";
    const src = srcPrefix + type + srcSufix;
    
    let currentPieceAlphs: Array<AlphPositions> = new Array<AlphPositions>();
    const currentIndex = type === Types.Pawn ? pawnIndex : communPiecesIndex;
    const ableToChange = type === Types.Pawn;

    switch (type) {
        case Types.Pawn:
            currentPieceAlphs = pawnsAlphs;
            break;
        case Types.Tower:
            currentPieceAlphs = towerAlphs;
            break;
        case Types.Horse:
            currentPieceAlphs = horseAlphs;
            break;
        case Types.Bishop:
            currentPieceAlphs = bishopAlphs;
            break;
        case Types.Queen:
            currentPieceAlphs = queenAlph;
            break;
        case Types.King:
            currentPieceAlphs = kingAlph;
            break;
    }

    return currentPieceAlphs.map((alph) => {
        return new Piece(
            type,
            {
                alpha: alph,
                index: currentIndex,
            },
            color,
            ableToChange,
            src
        );
    });
}

const PiecesByColor = (color: Colors) => {
    const king: Array<Piece> = BuildPieces(Types.King, color);
    const queen: Array<Piece> = BuildPieces(Types.Queen, color);
    const bishop: Array<Piece> = BuildPieces(Types.Bishop, color);
    const horse: Array<Piece> = BuildPieces(Types.Horse, color);
    const towers: Array<Piece> = BuildPieces(Types.Tower, color);
    const pawns: Array<Piece> = BuildPieces(Types.Pawn, color);

    return [king, queen, bishop, horse, towers, pawns].flatMap(pieces => pieces);
}

const WhitePieces: Array<Piece> = PiecesByColor(Colors.White);
const BlackPieces: Array<Piece> = PiecesByColor(Colors.Black);

export const AllPieces = { WhitePieces, BlackPieces };
