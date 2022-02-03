import { useCallback, useEffect } from "react";
import Player from "../../Player/types";
import House from "../House/types";
import { Piece, Types } from "../Piece/types";
import { Coordinate } from "../types";
import { useGameContext } from "./context";

export const useGameLogic = () => {
    const { setBoardHouses, boardHouses, boardPieces, setDangerousHouses, player, setSelectedHouse, selectedHouse, setMovementHistory, movementHistory, ableHousesToMove, setHousesAbleToMove } = useGameContext();

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
        return boardHouses.find((house: House) => house.coordinate.alpha === coordinate.alpha && house.coordinate.index === coordinate.index);
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
            let possibleHousesToMove = allPossibilitiesToMove.filter(house => house.piece === undefined && house.coordinate.alpha === currentPosition.alpha);

            possibleHousesToEat = getPossibleHousesToPawnEat(myPieces, possibleHousesToEat, diagonallyPos, false);

            //se o peão já tiver se movimentado anteriormente, ele não tem direito a andar 2 casas de uma vez
            if (hasMovedBefore) {
                possibleHousesToMove = possibleHousesToMove.filter(house => house.coordinate.index !== currentPosition.index + 2);
            }

            const elPassantHouses = elPassant(movementHistory, player, diagonallyPos);

            possibleHousesToEat = possibleHousesToEat.concat(getPossibleHousesToPawnEat(myPieces, elPassantHouses, diagonallyPos, true));

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

    const replaceHouseInBoard = (houseToReplace: House, board:Array<House>) => {
        const newBoard = board.map((house: House) => {
            if(house.coordinate === houseToReplace.coordinate) {
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
            if(elPassantPiece) {
                const actuallyPiece = lastHouseSelected.piece;
                const lastHouseMoved = movementHistory[movementHistory.length - 1];
                const elPassantHouse = findHouseByCoordinates({
                    index: elPassantPiece.coordinate.index - player.direction(player.color === lastHouseMoved.color),
                    alpha: elPassantPiece.coordinate.alpha });
                const houseWithElPassantPiece = findHouseByCoordinates({
                    index: elPassantPiece.coordinate.index,
                    alpha: elPassantPiece.coordinate.alpha });
                if(!elPassantHouse || !houseWithElPassantPiece) return;
                elPassantHouse.piece = lastHouseSelected.piece;
                elPassantHouse.piece.coordinate = elPassantHouse.coordinate;
                houseWithElPassantPiece.piece = undefined;
                lastHouseSelected.piece = undefined;
                let newBoard = replaceHouseInBoard(lastHouseSelected, boardHouses);
                newBoard = replaceHouseInBoard(elPassantHouse, newBoard);
                newBoard = replaceHouseInBoard(houseWithElPassantPiece, newBoard);
                setHousesAbleToMove([]);
                setSelectedHouse(undefined);
                setDangerousHouses([]);
                setBoardHouses(newBoard);
                return setMovementHistory(movementHistory.concat(actuallyPiece));
                
            }

            const actuallyPiece = lastHouseSelected.piece;
            actuallyHouse.piece = lastHouseSelected.piece;
            actuallyHouse.piece.coordinate = actuallyHouse.coordinate;
            lastHouseSelected.piece = undefined;
            let newBoard = replaceHouseInBoard(lastHouseSelected, boardHouses);
            newBoard = replaceHouseInBoard(actuallyHouse, newBoard);
            setHousesAbleToMove([]);
            setSelectedHouse(undefined);
            setBoardHouses(newBoard);
            setMovementHistory(movementHistory.concat(actuallyPiece));
        }
    };

    const houseHandler = (house: House): void => {
        if(ableHousesToMove.includes(house))
        {
            movePiece(selectedHouse, house);
        }else {
            setSelectedHouse(house);
            setHousesAbleToMove([]);

            if (house.piece && player?.friendlyPiece(house?.piece)) {
                handleHousesToMove(house.piece, true);
            } else {
                setHousesAbleToMove([]);
            }
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

const elPassant = (movementHistory: Piece[], player: Player, possibleHousesToEat: House[]) => {
    //Logica do El Passant: Se o peão inimigo se movimentar para duas casas adiante em seu primeiro movimento...
    //... caso haja um peão inimigo na quinta casa (se ele for preto) || na quarta casa (se ele for branco), ou seja, em paralelo a ele...
    //...o peão aliado pode comer o peão inimigo...
    //... se movimentando para a casa traseira do peão inimigo (index - 1)
    // Ele só vai ter a oportunidade de realizar esse movimento SE A ÚLTIMA JOGADA INIMIGA TIVER SIDO ESSE MOVIMENTO DUPLO COM O PEÃO
    const elPassantHouses:Array<House> = new Array<House>();
    if (movementHistory.length === 0) return elPassantHouses;
    possibleHousesToEat.forEach((house:House) => {
        if(house.pseudoPawn(movementHistory, player)) elPassantHouses.push(house);
    });
    return elPassantHouses;
};

const getPossibleHousesToPawnEat = (myPieces: boolean, possibleHousesToEat: House[], diagonallyPos: House[], elPassant: boolean) => {
    if (myPieces) {
        if (elPassant) return possibleHousesToEat = possibleHousesToEat.concat(diagonallyPos.filter(h => possibleHousesToEat.find(x => x.coordinate === h.coordinate)));
        possibleHousesToEat = diagonallyPos.filter(house => house.piece);
    } else {
        //o rei não pode se movimentar para qualquer casa
        //por isso é necessário saber quais casas o inimigo pode se deslocar pra comer
        possibleHousesToEat = diagonallyPos;
    }
    return possibleHousesToEat;
};

