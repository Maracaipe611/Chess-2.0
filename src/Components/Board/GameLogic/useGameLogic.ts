import { useCallback, useEffect } from "react";
import House from "../House/types";
import { Piece, Types } from "../Piece/types";
import { Coordinate } from "../types";
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
        if(!player) return possibleHousesToEat;
        // if (!player?.friendlyPiece(piece)) return possibleHousesToEat; //não permitir que o jogador visualize o movimento inimigo

        const pieceDirection = player.direction(myPieces);
        const currentPosition = piece.coordinate;
        const allPossibilitiesToMove: Array<House> = validatePossibleHouses(piece, pieceDirection);

        switch (piece.type) {
        case Types.Pawn: {
            const hasMovedBefore = piece.hasMoved(movementHistory);
            const diagonallyPos = allPossibilitiesToMove.filter(house => house.coordinate.alpha !== currentPosition.alpha);
            const possibleHousesToMove = allPossibilitiesToMove.filter(house => house.piece === undefined && house.coordinate.alpha === currentPosition.alpha);

            possibleHousesToEat = getPossibleHousesToPawnEat(myPieces, possibleHousesToEat, diagonallyPos);

            //se o peão já tiver se movimentado anteriormente, ele não tem direito a andar 2 casas de uma vez
            if (hasMovedBefore) {
                possibleHousesToMove.filter(house => house.coordinate.index === currentPosition.index + 2);
            }

            elPassant(movementHistory, piece, findHouseByCoordinates, possibleHousesToEat);

            const finalPossibilities = possibleHousesToMove.concat(possibleHousesToEat);
            //estacar as possibilidades = 
            //setHousesAbleToMove(ableHousesToMove.concat(finalPossibilities));
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
        if (house.piece && player?.friendlyPiece(house?.piece)) {
            handleHousesToMove(house.piece, true);
        } else {
            setHousesAbleToMove([]);
        }
    };

    //setar casas perigosas para que o rei não possa se mover pra elas
    useEffect(() => {
        if (!boardPieces?.length) return;
        const enemyPieces: Array<Piece> = boardPieces.filter(piece => piece.color === player?.enemyColor());
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

const getPossibleHousesToPawnEat = (myPieces: boolean, possibleHousesToEat: House[], diagonallyPos: House[]) => {
    if (myPieces) {
        possibleHousesToEat = diagonallyPos.filter(house => house.piece);
    } else {
        //o rei não pode se movimentar para qualquer casa
        //por isso é necessário saber quais casas o inimigo pode se deslocar pra comer
        possibleHousesToEat = diagonallyPos;
    }
    return possibleHousesToEat;
};

