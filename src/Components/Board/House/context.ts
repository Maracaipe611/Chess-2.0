import { Piece, Colors, Coordinate, AlphPositions, IndexPositions, AllPieces } from "../Piece/context";

export default class House {
    coordinate: Coordinate;
    busy: boolean;
    color: Colors;
    piece?: Piece | undefined;

    constructor(coordinate: Coordinate, busy: boolean, color: Colors, piece: Piece | undefined) {
        this.coordinate = coordinate;
        this.busy = busy;
        this.color = color;
        this.piece = piece;
    };

}



const buildSingleHouse = (alpha: number, index: IndexPositions) => {
    const { BlackPieces, WhitePieces } = AllPieces;

    const piceInThisHouse: Piece | undefined =
        BlackPieces.find(piece => piece.coordinate.alpha === alpha && piece.coordinate.index === index) ||
        WhitePieces.find(piece => piece.coordinate.alpha === alpha && piece.coordinate.index === index);
    const color = (alpha + index) % 2 === 0 ? Colors.White : Colors.Black;
    return new House(
        {
            alpha: alpha,
            index: index,
        },
        !!piceInThisHouse,
        color,
        piceInThisHouse
    )
};

const buildAllHouses = (): Array<House> => {
    const { A, B, C, D, E, F, G, H } = AlphPositions;
    const alphs = [A, B, C, D, E, F, G, H];
    const indexesPosition: Array<IndexPositions> = [1, 2, 3, 4, 5, 6, 7, 8];
    return alphs.map((alph, index) => {
        return buildSingleHouse(alph, indexesPosition[index]);
    });
}

export const AllHouses = buildAllHouses();