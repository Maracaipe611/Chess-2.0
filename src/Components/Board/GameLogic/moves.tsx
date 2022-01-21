import { useCallback } from "react";
import House from "../House/types";
import { Piece, Types } from "../Piece/types";
import { Colors } from "../types";
import { useGameContext } from "./context";
import { Player } from "../../Player/types";


export const useGameLogic = () => {
    const {
        boardHouses, setBoardHouses,
        boardPieces, setBoardPieces,
        movementHistory, setMovementHistory,
        dangerousHouses, setDangerousHouses,
        player,
        selectedPiece, setSelectedPiece,
    } = useGameContext();

    const validatePossibleHouses = useCallback((piece: Piece):Array<House> => {
        let possibleHousesToMove: Array<House> = new Array<House>();
        piece.moves.forEach(movement => {
            const tempPossibilities = boardHouses.find(house => {
                if (movement) {
                    if (house.coordinate.alpha === piece.coordinate.alpha + movement.x &&
                        house.coordinate.index === piece.coordinate.index + movement.y) {
                        return house;
                    }
                }
            });
            if (tempPossibilities) possibleHousesToMove.push(tempPossibilities)
        });

        return possibleHousesToMove;
    }, [boardHouses]);

    const ableHousesToMove = useCallback((piece: Piece): Array<House> => {
        const currentPosition = piece.coordinate;
        switch (piece.type) {
            case Types.Pawn:
                let allPossibilitiesToMove = validatePossibleHouses(piece);
                const diagonallyPos = allPossibilitiesToMove.filter(house => house.coordinate.alpha !== currentPosition.alpha);
                const possibleHouseToMove = allPossibilitiesToMove.filter(house => house.piece === undefined && house.coordinate.alpha === currentPosition.alpha);
                const possibleHousesToEat = diagonallyPos.filter(house => house.piece);
                const finalPossibilities = possibleHouseToMove.concat(possibleHousesToEat);
                console.log(finalPossibilities);
                setDangerousHouses(finalPossibilities);
                break;
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

    const houseHandler = (house: House):void => {
        if (!!house.piece && house.piece.color === player?.color) {
            setSelectedPiece(house.piece);
            ableHousesToMove(house.piece);
        }
    }

    //setar casas perigosas para que o rei não possa se mover pra elas
    useCallback(() => {
        //supondo que o jogador esteja com as brancas
        const enemyPieces: Array<Piece> = boardPieces.filter(piece => piece.color === Colors.Black);
        const allPossibleMoves: Array<House> = enemyPieces.flatMap(enemyPiece => ableHousesToMove(enemyPiece));
        setDangerousHouses(allPossibleMoves);
    }, [boardPieces, ableHousesToMove, setDangerousHouses]);

    return { houseHandler }
};