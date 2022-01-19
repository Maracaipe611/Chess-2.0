import { Piece, Colors, Coordinate, AlphPositions, IndexPositions, AllPieces } from "../Piece/context";

export default class House {
    coordinate: Coordinate;
    busy: boolean;
    color: Colors;
    piece?: Piece | undefined;
    src: string;

    constructor(coordinate: Coordinate, busy: boolean, color: Colors, piece: Piece | undefined, src:string) {
        this.coordinate = coordinate;
        this.busy = busy;
        this.color = color;
        this.piece = piece;
        this.src = src;
    };

}



const buildSingleHouse = (alpha: number, index: IndexPositions):House => {
    const { BlackPieces, WhitePieces } = AllPieces;

    const whitePieceOnThisHouse: Piece | undefined = WhitePieces.find(piece => piece.coordinate.alpha === alpha && piece.coordinate.index === index);
    const blackPieceOnThisHouse: Piece | undefined = BlackPieces.find(piece => piece.coordinate.alpha === alpha && piece.coordinate.index === index)
    const pieceOnThisHouse = !!blackPieceOnThisHouse ? blackPieceOnThisHouse : whitePieceOnThisHouse;

    const color = (alpha + index) % 2 === 0 ? Colors.White : Colors.Black;
    const srcPrefix = "./Images/";
    const srcSufix = ".jpg";
    const src = srcPrefix + (color === Colors.White ? "lightWoodenHouse" : "woodenHouse") + srcSufix;
    return new House(
        {
            alpha: alpha,
            index: index,
        },
        !!pieceOnThisHouse,
        color,
        pieceOnThisHouse,
        src,
    )
};

const buildAllHouses = (): Array<House> => {
    const { A, B, C, D, E, F, G, H } = AlphPositions;
    const alphs: Array<AlphPositions> = [A, B, C, D, E, F, G, H];
    const indexesPosition: Array<IndexPositions> = [1, 2, 3, 4, 5, 6, 7, 8];
    const allHouses: Array<House> = indexesPosition.flatMap(alph => {
        return alphs.map(index => {
            return buildSingleHouse(alph, index);
        });
    });
    
    return allHouses;
}

export const AllHouses = buildAllHouses();