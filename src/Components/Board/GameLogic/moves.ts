import { useCallback } from "react";
import House from "../House/types";
import { Piece, Types } from "../Piece/types";
import { Colors, Coordinate } from "../types";
import { useGameContext } from "./context";

export const useGameLogic = () => {
    const { boardHouses, boardPieces, setDangerousHouses, player, setSelectedHouse, movementHistory, ableHousesToMove, setHousesAbleToMove } = useGameContext();

    const validatePossibleHouses = useCallback((piece: Piece): Array<House> => {
        const possibleHousesToMove: Array<House> = new Array<House>();
        piece.moves.forEach(movement => {
            const tempPossibilities = boardHouses.find(house => {
                if (movement) {
                    if (house.coordinate.alpha === piece.coordinate.alpha + movement.x &&
                        house.coordinate.index === piece.coordinate.index + movement.y) {
                        return house;
                    }
                }
            });
            if (tempPossibilities) possibleHousesToMove.push(tempPossibilities);
        });

        return possibleHousesToMove;
    }, [boardHouses]);

    const findHouseByPieceId = (piece: Piece):House | undefined => {
        return boardHouses.find(house => house.piece?.id === piece.id);
    };

    const findHouseByCoordinates = (coordinate: Coordinate): House | undefined => {
        return boardHouses.find(house => house.coordinate === coordinate);
    };

    const handleHousesToMove = useCallback((piece: Piece): Array<House> => {
        const currentPosition = piece.coordinate;
        const allPossibilitiesToMove:Array<House> = validatePossibleHouses(piece);

        switch (piece.type) {
        case Types.Pawn: {
            const hasMovedBefore = piece.getHasMoved(movementHistory);
            const diagonallyPos = allPossibilitiesToMove.filter(house => house.coordinate.alpha !== currentPosition.alpha);
            const possibleHousesToMove = allPossibilitiesToMove.filter(house => house.piece === undefined && house.coordinate.alpha === currentPosition.alpha);
            const possibleHousesToEat = diagonallyPos.filter(house => house.piece);
            
            if(hasMovedBefore) {
                possibleHousesToMove.filter(house => house.coordinate.index === currentPosition.index + 2);
            }
            
            //El passant
            ///TODO: Definir como a casa que está com a pseudo peça vai ser reconhecida
            const lastEnemyMove: Piece | undefined = movementHistory[movementHistory.length - 1];
            const isFirstMoveOfPiece: boolean = movementHistory.filter(piece => piece.id === lastEnemyMove.id).length === 0;
            const pawnsIsAlignedInFifthRank: boolean = piece.coordinate.index === 5 && lastEnemyMove.coordinate.index === 5;
            if(lastEnemyMove?.type === Types.Pawn && isFirstMoveOfPiece && pawnsIsAlignedInFifthRank) {
                if (lastEnemyMove.coordinate.alpha === piece.coordinate.alpha - 1) {
                    const houseElPassant = findHouseByCoordinates({
                        alpha: piece.coordinate.alpha - 1,
                        index: piece.coordinate.index + 1
                    });
                    if (houseElPassant) possibleHousesToEat.push(houseElPassant);
                }else
                if (lastEnemyMove.coordinate.alpha === piece.coordinate.alpha + 1) {
                    const coordinateHouseElPassant = findHouseByCoordinates({
                        alpha: piece.coordinate.alpha + 1,
                        index: piece.coordinate.index + 1
                    });
                    if (coordinateHouseElPassant) possibleHousesToEat.push(coordinateHouseElPassant);
                }
            }

            const finalPossibilities = possibleHousesToMove.concat(possibleHousesToEat);
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
            //cant move if he will die
            break;
        default:
            break;
        }

        return new Array<House>();
    }, [validatePossibleHouses, setDangerousHouses]);

    const houseHandler = (house: House): void => {
        setSelectedHouse(house);
        if (house.piece && house.piece.color === player?.color) {
            handleHousesToMove(house.piece);
        }else {
            setHousesAbleToMove([]);
        }
    };

    //setar casas perigosas para que o rei não possa se mover pra elas
    useCallback(() => {
        if (!boardPieces) return;
        //supondo que o jogador esteja com as brancas
        const enemyPieces: Array<Piece> = boardPieces.filter(piece => piece.color === Colors.Black);
        const allPossibleMoves: Array<House> = enemyPieces.flatMap(enemyPiece => handleHousesToMove(enemyPiece));
        setDangerousHouses(allPossibleMoves);
    }, [boardPieces, ableHousesToMove, setDangerousHouses]);

    return { houseHandler };
};