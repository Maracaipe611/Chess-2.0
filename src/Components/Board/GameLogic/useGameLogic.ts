import { useCallback, useEffect } from "react";
import Player from "../../Player/types";
import House from "../House/types";
import { Piece, Types } from "../Piece/types";
import { Coordinate } from "../types";
import { useGameContext } from "./context";

export const useGameLogic = () => {
    const { setBoardHouses, boardHouses,
        boardPieces,
        player,
        setDangerousHouses,
        setSelectedHouse, selectedHouse,
        setMovementHistory, movementHistory,
        setAbleHousesToMove, ableHousesToMove, } = useGameContext();

    useEffect(() => { //toda vez q uma peça tem alguma ação...
        if (!boardPieces?.length) return;
        const enemyPieces: Array<Piece> = boardPieces.filter(piece => piece.color === player?.enemyColor());
        const allPossibleMoves: Array<House> = enemyPieces.flatMap(enemyPiece => handleHousesToMove(enemyPiece, false));
        setDangerousHouses(allPossibleMoves);
        setAbleHousesToMove([]);
    }, [boardPieces, player]);
    
    const houseHandler = (house: House): void => {
        if (ableHousesToMove.includes(house)) {
            movePiece(selectedHouse, house);
        } else {
            setSelectedHouse(house);

            if (house.piece && player?.friendlyPiece(house?.piece)) {
                handleHousesToMove(house.piece, true);
            } else {
                setAbleHousesToMove([]);
            }
        }
    };

    const handleResetWhenMove = () => {
        setAbleHousesToMove([]);
        setSelectedHouse(undefined);
        setDangerousHouses([]);
    };

    const possibleHousesToMove = (piece: Piece, direction: number): Array<House> => {
        const possibleHousesToMove: Array<House> = new Array<House>();
        piece.moves.forEach(movement => {
            const tempPossibilities = boardHouses.find(house => {
                if (movement) {
                    const futureHouse:Coordinate = {
                        alpha: piece.coordinate.alpha + (movement.x * direction),
                        index: piece.coordinate.index + (movement.y * direction)
                    };
                    if (house.coordinate.alpha === futureHouse.alpha &&
                        house.coordinate.index === futureHouse.index) {
                        return house;
                    }
                }
            });
            if (tempPossibilities) possibleHousesToMove.push(tempPossibilities);
        });

        return possibleHousesToMove;
    };

    const findHouseByCoordinates = (coordinate: Coordinate): House | undefined => {
        return boardHouses.find((house: House) => house.coordinate.alpha === coordinate.alpha && house.coordinate.index === coordinate.index);
    };

    const elPassant = (movementHistory: Piece[], player: Player, possibleHousesToEat: House[]) => {
        const elPassantHouses: Array<House> = new Array<House>();
        const didntMovedAnyPiece = movementHistory.length === 0;
        if (didntMovedAnyPiece) return elPassantHouses;
        possibleHousesToEat.forEach((house: House) => {
            if (house.pseudoPawn(movementHistory, player)) elPassantHouses.push(house);
        });
        return elPassantHouses;
    };

    const getPossibleHousesToPawnEat = (myPieces: boolean, possibleHousesToEat: House[], diagonallyPos: House[], elPassant: boolean) => {
        if (myPieces && elPassant) {
            possibleHousesToEat = possibleHousesToEat.concat(diagonallyPos.filter(h => possibleHousesToEat.find(x => x.coordinate === h.coordinate)));
        } else if (myPieces) {
            possibleHousesToEat = diagonallyPos.filter(house => house.piece && house.piece.color === player?.enemyColor());
        } else {
            possibleHousesToEat = diagonallyPos;
        }
        return possibleHousesToEat;
    };

    const handleHousesToMove = useCallback((piece: Piece, myPieces: boolean): Array<House> => {
        let possibleHousesToEat: Array<House> = new Array<House>();
        if (!player) return possibleHousesToEat;
        if (!player?.friendlyPiece(piece) && !player.canViewPossibleEnemyMoves) return possibleHousesToEat; //não permitir que o jogador visualize o movimento inimigo

        const pieceDirection = player.direction(myPieces);
        const currentPosition = piece.coordinate;
        const allPossibilitiesToMove: Array<House> = possibleHousesToMove(piece, pieceDirection);

        switch (piece.type) {
        case Types.Pawn: {
            const hasMovedBefore = piece.hasMoved(movementHistory);
            const diagonalPossibilities = allPossibilitiesToMove.filter(house => house.coordinate.alpha !== currentPosition.alpha);
            const elPassantHouses = elPassant(movementHistory, player, diagonalPossibilities);

            let possibleHousesToMove = allPossibilitiesToMove.filter(house => house.piece === undefined && house.coordinate.alpha === currentPosition.alpha);
            possibleHousesToEat = getPossibleHousesToPawnEat(myPieces, possibleHousesToEat, diagonalPossibilities, false);
            possibleHousesToEat = possibleHousesToEat.concat(getPossibleHousesToPawnEat(myPieces, elPassantHouses, diagonalPossibilities, true));

            if (hasMovedBefore) { //se o peão já tiver se movimentado anteriormente, ele não tem direito a andar 2 casas de uma vez
                possibleHousesToMove = possibleHousesToMove.filter(house => house.coordinate.index !== currentPosition.index + (2 * player.direction(player.color === piece.color)));
            }
            const finalPossibilities = possibleHousesToMove.concat(possibleHousesToEat);
            setAbleHousesToMove(finalPossibilities);
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

    const replaceHouseInBoard = (houseToReplace: House, board: Array<House>) => {
        const newBoard = board.map((house: House) => {
            if (house.coordinate === houseToReplace.coordinate) {
                return houseToReplace;
            }
            return house;
        });
        return newBoard;
    };

    const movePiece = (lastHouseSelected: House | undefined, actuallyHouse: House) => {
        if (!actuallyHouse || !lastHouseSelected || !player) return;
        if (actuallyHouse.piece) {
            //eat
        } else if (lastHouseSelected.piece) {
            const elPassantPiece = actuallyHouse.pseudoPawn(movementHistory, player);
            if (elPassantPiece) {
                const actuallyPiece = lastHouseSelected.piece;
                const lastHouseMoved = movementHistory[movementHistory.length - 1];
                const elPassantHouse = findHouseByCoordinates({
                    index: elPassantPiece.coordinate.index - player.direction(player.color === lastHouseMoved.color),
                    alpha: elPassantPiece.coordinate.alpha
                });
                const houseWithElPassantPiece = findHouseByCoordinates(elPassantPiece.coordinate);
                if (!elPassantHouse || !houseWithElPassantPiece) return;
                elPassantHouse.piece = lastHouseSelected.piece;
                elPassantHouse.piece.coordinate = elPassantHouse.coordinate;
                houseWithElPassantPiece.piece = undefined;
                lastHouseSelected.piece = undefined;
                let newBoard = replaceHouseInBoard(lastHouseSelected, boardHouses);
                newBoard = replaceHouseInBoard(elPassantHouse, newBoard);
                newBoard = replaceHouseInBoard(houseWithElPassantPiece, newBoard);
                handleResetWhenMove();
                setBoardHouses(newBoard);
                return setMovementHistory(movementHistory.concat(actuallyPiece));

            }

            const actuallyPiece = lastHouseSelected.piece;
            actuallyHouse.piece = lastHouseSelected.piece;
            actuallyHouse.piece.coordinate = actuallyHouse.coordinate;
            lastHouseSelected.piece = undefined;
            let newBoard = replaceHouseInBoard(lastHouseSelected, boardHouses);
            newBoard = replaceHouseInBoard(actuallyHouse, newBoard);
            handleResetWhenMove();
            setBoardHouses(newBoard);
            setMovementHistory(movementHistory.concat(actuallyPiece));
        }
    };

    return { houseHandler };
};

