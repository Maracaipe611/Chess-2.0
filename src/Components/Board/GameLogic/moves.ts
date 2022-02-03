import { useCallback, useEffect } from "react";
import House from "../House/types";
import { Piece, Types } from "../Piece/types";
import { Colors, Coordinate } from "../types";
import { useGameContext } from "./context";

export const useGameLogic = () => {
    const { boardHouses, boardPieces, setDangerousHouses, player, setSelectedHouse, movementHistory, ableHousesToMove, setHousesAbleToMove } = useGameContext();

    const validatePossibleHouses = (piece: Piece, direction: number): Array<House> => {
        const possibleHousesToMove: Array<House> = new Array<House>();
        piece.moves.forEach(movement => {
            const tempPossibilities = boardHouses.find(house => {
                if (movement) {
                    if (house.coordinate.alpha === piece.coordinate.alpha + (movement.x * direction) &&
                        house.coordinate.index === piece.coordinate.index + (movement.y * direction)) {
                        return house;
                    }
                }
            });
            if (tempPossibilities) possibleHousesToMove.push(tempPossibilities);
        });

        return possibleHousesToMove;
    };

    const findHouseByCoordinates = (coordinate: Coordinate): House | undefined => {
        return boardHouses.find(house => house.coordinate === coordinate);
    };

    const handleHousesToMove = useCallback((piece: Piece, myPieces: boolean): Array<House> => {
        let possibleHousesToEat: Array<House> = new Array<House>();
        if (piece.color !== player?.color) return possibleHousesToEat; //não permitir que o jogador visualize o movimento inimigo

        const direction: number = myPieces ? (player?.color === Colors.White ? 1 : -1) : (player?.color === Colors.White ? -1 : 1);
        const currentPosition = piece.coordinate;
        const allPossibilitiesToMove: Array<House> = validatePossibleHouses(piece, direction);

        switch (piece.type) {
        case Types.Pawn: {
            const hasMovedBefore = piece.hasMoved(movementHistory);
            const diagonallyPos = allPossibilitiesToMove.filter(house => house.coordinate.alpha !== currentPosition.alpha);
            const possibleHousesToMove = allPossibilitiesToMove.filter(house => house.piece === undefined && house.coordinate.alpha === currentPosition.alpha);

            //definir qual a direção que a peça segue baseada na cor da peça e cor do jogador
            //só aplica ao peão pois ele não pode andar pra trás
            if (direction === 1 && player?.color === Colors.White ||
                    direction === -1 && player?.color === Colors.Black) {
                possibleHousesToEat = diagonallyPos.filter(house => house.piece);
            } else {
                possibleHousesToEat = diagonallyPos;
            }

            //se o peão já tiver se movimentado anteriormente, ele não tem direito a andar 2 casas de uma vez
            if (hasMovedBefore) {
                possibleHousesToMove.filter(house => house.coordinate.index === currentPosition.index + 2);
            }

            elPassant(movementHistory, piece, findHouseByCoordinates, possibleHousesToEat);

            const finalPossibilities = possibleHousesToMove.concat(possibleHousesToEat);
            //ver todas as possibilidades = setHousesAbleToMove(...housesAbleToMove, finalPossibilities)
            setHousesAbleToMove(finalPossibilities);
            break;
        }
        case Types.Tower:
            //Rock
            break;
        case Types.Horse:
            //can jump
            break;
        case Types.Bishop:
            break;
        case Types.Queen:
            break;
        case Types.King:
            //cant move to dangerous houses
            break;
        default:
            break;
        }

        return possibleHousesToEat;
    }, [ableHousesToMove, movementHistory, boardPieces, player]);

    const houseHandler = (house: House): void => {
        setSelectedHouse(house);
        setHousesAbleToMove([]);
        if (house.piece && house.piece.color === player?.color) {
            handleHousesToMove(house.piece, true);
        } else {
            setHousesAbleToMove([]);
        }
    };

    //setar casas perigosas para que o rei não possa se mover pra elas
    useEffect(() => {
        if (!boardPieces?.length) return;
        const enemyPieces: Array<Piece> = boardPieces.filter(piece => piece.color !== player?.color);
        const allPossibleMoves: Array<House> = enemyPieces.flatMap(enemyPiece => handleHousesToMove(enemyPiece, false));
        setDangerousHouses(allPossibleMoves);
        setHousesAbleToMove([]);
    }, [boardPieces, player]);

    return { houseHandler };
};

const elPassant = (movementHistory: Piece[], piece: Piece, findHouseByCoordinates: (coordinate: Coordinate) => House | undefined, possibleHousesToEat: House[]) => {
    //El passant
    ///TODO: Definir como a casa que está com a pseudo peça vai ser reconhecida
    const lastEnemyMove: Piece | undefined = movementHistory[movementHistory.length - 1];
    const isFirstMoveOfPiece: boolean = movementHistory.filter(piece => piece.id === lastEnemyMove.id).length === 0;
    const pawnsIsAlignedInFifthRank: boolean = piece.coordinate.index === 5 && lastEnemyMove.coordinate.index === 5;
    if (lastEnemyMove?.type === Types.Pawn && isFirstMoveOfPiece && pawnsIsAlignedInFifthRank) {
        if (lastEnemyMove.coordinate.alpha === piece.coordinate.alpha - 1) {
            const houseElPassant = findHouseByCoordinates({
                alpha: piece.coordinate.alpha - 1,
                index: piece.coordinate.index + 1
            });
            if (houseElPassant)
                possibleHousesToEat.push(houseElPassant);
        }
        else if (lastEnemyMove.coordinate.alpha === piece.coordinate.alpha + 1) {
            const coordinateHouseElPassant = findHouseByCoordinates({
                alpha: piece.coordinate.alpha + 1,
                index: piece.coordinate.index + 1
            });
            if (coordinateHouseElPassant)
                possibleHousesToEat.push(coordinateHouseElPassant);
        }
    }
};
