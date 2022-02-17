import { useCallback, useEffect } from "react";
import Player from "../../Components/Player/types";
import House from "../../Components/Board/House/types";
import { Piece, Types } from "../../Components/Board/Piece/types";
import { Coordinate } from "../Board/types";
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
    
    const houseHandler = (house: House) => {
        const playerIsTryingToMove = ableHousesToMove.includes(house); //implementar redux para as possíveis ações com a casa

        if (playerIsTryingToMove) {
            return movePiece(selectedHouse, house);
        }
        setSelectedHouse(house);
        if(!house.piece) {
            setAbleHousesToMove([]);
        }else {
            const pickedPiece = house.piece;
            if(pickedPiece)
            {
                const playerInPickingHisOwnPiece =  player.friendlyPiece(pickedPiece);
                if (playerInPickingHisOwnPiece) return handleHousesToMove(pickedPiece, true);
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
                const futureHouse:Coordinate = {
                    alpha: piece.coordinate.alpha + (movement.alpha * direction),
                    index: piece.coordinate.index + (movement.index * direction)
                };
                if (house.coordinate.alpha === futureHouse.alpha &&
                        house.coordinate.index === futureHouse.index) {
                    return house;
                }
                
            });
            if (tempPossibilities) possibleHousesToMove.push(tempPossibilities);
        });

        return possibleHousesToMove;
    };

    const findHouseByCoordinates = (coordinate: Coordinate): House | undefined => {
        return boardHouses.find((house: House) => house.coordinate.alpha === coordinate.alpha && house.coordinate.index === coordinate.index);
    };

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
            possibleHousesToEat = diagonallyPos.filter(house => house.piece && house.piece.color === player?.enemyColor());
        } else {
            possibleHousesToEat = diagonallyPos;
        }
        return possibleHousesToEat;
    };

    const handleHousesToMove = useCallback((piece: Piece, myPieces: boolean): Array<House> => {
        let possibleHousesToEat: Array<House> = new Array<House>();

        //temporário -> Visualizar possíveis movimentos inimigos só deve ser possível localmente
        if (player.friendlyPiece(piece) && player.canViewPossibleEnemyMoves) return possibleHousesToEat; //não permitir que o jogador visualize o movimento inimigo

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
            const finalPossibilities = possibleHousesToMove.concat(possibleHousesToEat);
            setAbleHousesToMove(finalPossibilities);
            break;
        }
        case Types.Tower: {
            const housesAbleToMoveProcessed = new Array<House>();
            allPossibilitiesToMove.forEach(house => {
                if (house.piece?.color !== player.color) housesAbleToMoveProcessed.push(house);
            });
            //Rock

            setAbleHousesToMove(housesAbleToMoveProcessed);
            break;
        }
        case Types.Horse:{
            //can jump
            const housesAbleToMoveProcessed = new Array<House>();
            allPossibilitiesToMove.forEach(house => {
                if (house.piece?.color !== player.color) housesAbleToMoveProcessed.push(house);
            });
            //Rock

            setAbleHousesToMove(housesAbleToMoveProcessed);
            break;
        }
        case Types.Bishop:{
            const housesAbleToMoveProcessed = new Array<House>();
            allPossibilitiesToMove.forEach(house => {
                if (house.piece?.color !== player.color) housesAbleToMoveProcessed.push(house);
            });
            //Rock

            setAbleHousesToMove(housesAbleToMoveProcessed);
            break;
        }
        case Types.Queen:{
            const housesAbleToMoveProcessed = new Array<House>();
            allPossibilitiesToMove.forEach(house => {
                if ((house.piece?.color !== player.color) || !house.piece) {
                    housesAbleToMoveProcessed.push(house);
                }
            });
            //Rock

            setAbleHousesToMove(housesAbleToMoveProcessed);
            break;
        }
        case Types.King:{
            const housesAbleToMoveProcessed = new Array<House>();
            allPossibilitiesToMove.forEach(house => {
                if (house.piece?.color !== player.color) housesAbleToMoveProcessed.push(house);
            });
            //Rock

            setAbleHousesToMove(housesAbleToMoveProcessed);
            //cant move to dangerous houses
            break;
        }
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

    const handleEat = (lastPieceHouse: House, newHouseForPiece: House): Array<House> => {
        if(!lastPieceHouse.piece) return boardHouses;
        newHouseForPiece.piece = lastPieceHouse.piece; //a peça é setada na nova casa
        newHouseForPiece.piece.coordinate = newHouseForPiece.coordinate; //as coordenadas da peça são setadas de acordo com a nova casa dela
        lastPieceHouse.piece = undefined; //a casa antiga não possui mais peças
        let newBoard = replaceHouseInBoard(lastPieceHouse, boardHouses);
        newBoard = replaceHouseInBoard(newHouseForPiece, newBoard);
        return newBoard;
    };

    const movePiece = (lastHouseSelected: House | undefined, actuallyHouse: House) => {
        if (!actuallyHouse || !lastHouseSelected || actuallyHouse.piece?.color === player.color) return setSelectedHouse(actuallyHouse);
        if (actuallyHouse.piece && lastHouseSelected.piece) {
            const actuallyPiece = lastHouseSelected.piece;
            const newBoard = handleEat(lastHouseSelected, actuallyHouse);
            handleResetWhenMove();
            setBoardHouses(newBoard);
            setMovementHistory(movementHistory.concat(actuallyPiece));
        } else if (lastHouseSelected.piece && lastHouseSelected.piece.type === Types.Pawn) {
            const enPassantPiece = actuallyHouse.pseudoPawn(movementHistory, player);
            if (enPassantPiece) {
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
                handleResetWhenMove();
                setBoardHouses(newBoard);
                return setMovementHistory(movementHistory.concat(actuallyPiece));
            }

            const actuallyPiece = lastHouseSelected.piece;
            const newBoard = handleEat(lastHouseSelected, actuallyHouse);
            handleResetWhenMove();
            setBoardHouses(newBoard);
            setMovementHistory(movementHistory.concat(actuallyPiece));
        }
    };

    return { houseHandler };
};

