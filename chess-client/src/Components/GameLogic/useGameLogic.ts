import { useCallback, useEffect } from "react";
import Player, { Actions } from "../../Components/Player/types";
import House from "../../Components/Board/House/types";
import { Piece, Types } from "../../Components/Board/Piece/types";
import { Coordinate } from "../Board/types";
import { useGameContext } from "./context";
import { MoveDirections } from "./Moves/moves";

export const useGameLogic = () => {
    const {
        setSelectedHouse, selectedHouse,
        player,
        /* setBoardHouses, boardHouses,
        boardPieces,
        setDangerousHouses, dangerousHouses,
        setMovementHistory, movementHistory,
        setAbleHousesToMove, ableHousesToMove,  */ } = useGameContext();

    /* useEffect(() => { //toda vez q uma peça tem alguma ação...
        if (!boardPieces?.length) return;
        const enemyPieces: Array<Piece> = boardPieces.filter(piece => piece.color === player.enemyColor());
        const allPossibleMoves: Array<House> = enemyPieces.flatMap(enemyPiece => handleHousesToMove(enemyPiece, false));
        setDangerousHouses(allPossibleMoves);
        setAbleHousesToMove([]);
    }, [boardPieces, player]); */

    const handleReset = () => {
        /* setAbleHousesToMove([]);
        setSelectedHouse(undefined);
        setDangerousHouses([]); */
    };
    
    const houseHandler = (house: House, action: Actions) => {
        /* switch (action) {
        case Actions.FriendlyPiece:
            if(!house.piece) return;
            setSelectedHouse(house);
            handleHousesToMove(house.piece, house.piece.isFriend(player));
            break;
        case Actions.EnemyPiece:
            if(!house.piece) return;
            setSelectedHouse(house);
            setAbleHousesToMove([]);
            handleHousesToMove(house.piece, house.piece.isFriend(player));
            break;
        case Actions.EnemyPieceAndEat:
            movePiece(selectedHouse, house);
            break;
        case Actions.NoPieceAndMove:
            setAbleHousesToMove([]);
            movePiece(selectedHouse, house);
            break;
        case Actions.NoPiece:
            setAbleHousesToMove([]);
            setSelectedHouse(house);
            break;
        case Actions.Unselect:
            setAbleHousesToMove([]);
            setSelectedHouse(undefined);
            break;
        case Actions.UnselectEnemy:
            setSelectedHouse(undefined);
            break;
        } */
    };

    /* const possibleHousesToMove = (piece: Piece, direction: number): Array<House> => {
        const possibleHousesToMove: Array<House> = new Array<House>();
        const canJump = Types.Horse === piece.type;
        const blockedDirections = new Array<MoveDirections>();

        if (piece.type === Types.King) {
            if(!kingCanRock(piece)) {
                //filtro de movimentos
            }
        } 
        piece.moves.forEach(movement => {
            const tempPossibilities = boardHouses.find(house => {
                const futureHouseCoord:Coordinate = {
                    alpha: piece.coordinate.alpha + (movement.alpha * direction),
                    index: piece.coordinate.index + (movement.index * direction)
                };
                const futureHouse = findHouseByCoordinates(futureHouseCoord);

                if (house.coordinate === futureHouse?.coordinate) {
                    if(canJump) return house;
                    if(futureHouse?.piece && !blockedDirections.includes(movement.direction)) {
                        blockedDirections.push(movement.direction);
                        return house;
                    }else if(!blockedDirections.includes(movement.direction)) {
                        return house;
                    }
                }
                
            });
            if (tempPossibilities) possibleHousesToMove.push(tempPossibilities);
        });

        return possibleHousesToMove;
    }; */

    /* const findHouseByCoordinates = (coordinate: Coordinate): House | undefined => {
        return boardHouses.find((house: House) => house.coordinate.alpha === coordinate.alpha && house.coordinate.index === coordinate.index);
    }; */

    const enPassant = (movementHistory: Piece[], player: Player, possibleHousesToEat: House[]) => {
        const enPassantHouses: Array<House> = new Array<House>();
        const didntMovedAnyPiece = movementHistory.length === 0;
        if (didntMovedAnyPiece) return enPassantHouses;
        possibleHousesToEat.forEach((house: House) => {
            if (house.pseudoPawn(movementHistory, player)) enPassantHouses.push(house);
        });
        return enPassantHouses;
    };

    const getPossibleHousesToPawnEat = (myPieces: boolean, possibleHousesToEat: House[], diagonallyPos: House[], enPassant: boolean) => {
        if (myPieces && enPassant) {
            possibleHousesToEat = possibleHousesToEat.concat(diagonallyPos.filter(h => possibleHousesToEat.find(x => x.coordinate === h.coordinate)));
        } else if (myPieces) {
            possibleHousesToEat = diagonallyPos.filter(house => house.piece && house.piece.color === player.enemyColor());
        } else {
            possibleHousesToEat = diagonallyPos;
        }
        return possibleHousesToEat;
    };

    const kingCanRock = (piece : Piece) => {

        return true;
    };

    /* const handleHousesToMove = useCallback((piece: Piece, myPieces: boolean): Array<House> => {
        let possibleHousesToEat: Array<House> = new Array<House>();

        let housesAbleToMoveProcessed = new Array<House>();
        const pieceDirection = player.direction(myPieces);
        const currentPosition = piece.coordinate;
        const allPossibilitiesToMove: Array<House> = possibleHousesToMove(piece, pieceDirection);

        switch (piece.type) {
        case Types.Pawn: {
            const hasMovedBefore = piece.hasMoved(movementHistory);
            const diagonalPossibilities = allPossibilitiesToMove.filter(house => house.coordinate.alpha !== currentPosition.alpha);
            const enPassantHouses = enPassant(movementHistory, player, diagonalPossibilities);

            let possibleHousesToMove = allPossibilitiesToMove.filter(house => house.piece === undefined && house.coordinate.alpha === currentPosition.alpha);
            possibleHousesToEat = getPossibleHousesToPawnEat(myPieces, possibleHousesToEat, diagonalPossibilities, false);
            possibleHousesToEat = possibleHousesToEat.concat(getPossibleHousesToPawnEat(myPieces, enPassantHouses, diagonalPossibilities, true));

            if (hasMovedBefore) { //se o peão já tiver se movimentado anteriormente, ele não tem direito a andar 2 casas de uma vez
                possibleHousesToMove = possibleHousesToMove.filter(house => house.coordinate.index !== currentPosition.index + (2 * player.direction(player.color === piece.color)));
            }
            possibleHousesToMove.push(...possibleHousesToEat);
            housesAbleToMoveProcessed = possibleHousesToMove;
            break;
        }
        case Types.Tower: {
            allPossibilitiesToMove.forEach(house => {
                if ((!house.piece?.isFriend(player)) || !house.piece) housesAbleToMoveProcessed.push(house);
            });
            possibleHousesToEat = allPossibilitiesToMove;
            break;
        }
        case Types.Horse:{
            //can jump
            allPossibilitiesToMove.forEach(house => {
                if ((!house.piece?.isFriend(player)) || !house.piece) housesAbleToMoveProcessed.push(house);
            });
            possibleHousesToEat = allPossibilitiesToMove;
            break;
        }
        case Types.Bishop:{
            allPossibilitiesToMove.forEach(house => {
                if ((!house.piece?.isFriend(player))  || !house.piece) housesAbleToMoveProcessed.push(house);
            });
            possibleHousesToEat = allPossibilitiesToMove;
            break;
        }
        case Types.Queen:{
            allPossibilitiesToMove.forEach(house => {
                if ((!house.piece?.isFriend(player)) || !house.piece) {
                    housesAbleToMoveProcessed.push(house);
                }
            });
            possibleHousesToEat = allPossibilitiesToMove;
            break;
        }
        case Types.King:{
            allPossibilitiesToMove.forEach(house => {
                if ((!house.piece?.isFriend(player)  || !house.piece) && !house.checkIfHouseIsOnThisArray(dangerousHouses))
                    housesAbleToMoveProcessed.push(house);
            });
            possibleHousesToEat = allPossibilitiesToMove;
            //cant move to dangerous houses
            break;
        }
        default:
            break;
        }

        if(myPieces) setAbleHousesToMove(housesAbleToMoveProcessed);
        return possibleHousesToEat;
    }, [ableHousesToMove, movementHistory, boardPieces, player]); */

    /* const replaceHouseInBoard = (houseToReplace: House, board: Array<House>) => {
        const newBoard = board.map((house: House) => {
            if (house.coordinate === houseToReplace.coordinate) {
                return houseToReplace;
            }
            return house;
        });
        return newBoard;
    }; */

    /* const handleEat = (lastPieceHouse: House, newHouseForPiece: House): Array<House> => {
        if(!lastPieceHouse.piece) return boardHouses;
        newHouseForPiece.piece = lastPieceHouse.piece; //a peça é setada na nova casa
        newHouseForPiece.piece.coordinate = newHouseForPiece.coordinate; //as coordenadas da peça são setadas de acordo com a nova casa dela
        lastPieceHouse.piece = undefined; //a casa antiga não possui mais peças
        let newBoard = replaceHouseInBoard(lastPieceHouse, boardHouses);
        newBoard = replaceHouseInBoard(newHouseForPiece, newBoard);
        return newBoard;
    }; */

    /* const movePiece = (lastHouseSelected: House | undefined, actuallyHouse: House) => {
        if (!lastHouseSelected || actuallyHouse.piece?.color === player.color) return;
        if (actuallyHouse.piece && lastHouseSelected.piece) {
            const actuallyPiece = lastHouseSelected.piece;
            const newBoard = handleEat(lastHouseSelected, actuallyHouse);
            handleReset();
            setBoardHouses(newBoard);
            return setMovementHistory(movementHistory.concat(actuallyPiece));
        } else if (lastHouseSelected.piece) {
            const enPassantPiece = actuallyHouse.pseudoPawn(movementHistory, player);
            if (enPassantPiece  && lastHouseSelected.piece.type === Types.Pawn) {
                const actuallyPiece = lastHouseSelected.piece;
                const enPassantHouse = findHouseByCoordinates({
                    index: enPassantPiece.coordinate.index - player.direction(player.color === enPassantPiece.color),
                    alpha: enPassantPiece.coordinate.alpha
                });
                const houseWithEnPassantPiece = findHouseByCoordinates(enPassantPiece.coordinate);
                if (!enPassantHouse || !houseWithEnPassantPiece) return;
                let newBoard = handleEat(lastHouseSelected, enPassantHouse);
                houseWithEnPassantPiece.piece = undefined;
                newBoard = replaceHouseInBoard(houseWithEnPassantPiece, newBoard);
                handleReset();
                setBoardHouses(newBoard);
                return setMovementHistory(movementHistory.concat(actuallyPiece));
            }

            const actuallyPiece = lastHouseSelected.piece;
            const newBoard = handleEat(lastHouseSelected, actuallyHouse);
            handleReset();
            setBoardHouses(newBoard);
            setMovementHistory(movementHistory.concat(actuallyPiece));
        }
    }; */

    return { houseHandler };
};

