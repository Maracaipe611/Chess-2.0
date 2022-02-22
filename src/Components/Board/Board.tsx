import React from "react";
import Player from "../Player/types";
import { useGameContext } from "../GameLogic/context";
import { HouseComponent } from "./House/index";
import { Types } from "./Piece/types";

const Board: React.FC = () => {
    const { boardHouses, setPlayer, player, dangerousHouses } = useGameContext();

    const changeView = ():Player => {
        return new Player(
            player.name,
            player.color,
            !player.canViewPossibleEnemyMoves
        );
    };

    const changeColor = ():Player => {
        return new Player(
            player.name,
            player.enemyColor(),
            player.canViewPossibleEnemyMoves,
        );
    };

    return (
        <div style={{ display: "grid" }}>
            <span style={{ color: "white" }}>Jogador: {player.name} | Cor:{player.color}</span>
            <span style={{ color: "white" }}>{dangerousHouses.find(house => house.piece?.type === Types.King && house.piece.isFriend(player)) ? "Check" : ""}</span>
            <div
                style={{
                    width: 480,
                    minWidth: 480,
                    display: "inline-flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                {boardHouses.map((house) => (
                    <HouseComponent
                        house={house}
                        key={house.currentPosition()}
                    />
                ))}
            </div>
            <button style={{ height: "30px", fontWeight: "bold" }} onClick={() => setPlayer(changeColor())}>Mudar de cor</button>
            <button style={{ height: "30px", fontWeight: "bold" }} onClick={() => setPlayer(changeView())}>Visualizar possíveis movimentos perigosos do inimigo{player.canViewPossibleEnemyMoves ? " ✅" : ""}</button>
        </div>
    );
};

export default Board;
