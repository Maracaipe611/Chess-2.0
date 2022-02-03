import React, { useEffect } from "react";
import Player from "../Player/types";
import { useGameContext } from "./GameLogic/context";
import { HouseComponent } from "./House/index";
import { Colors } from "./types";

const Board: React.FC = () => {
    const { boardHouses, setPlayer, player } = useGameContext();

    const whitePlayer:Player = new Player(
        "Lucas",
        Colors.White,
    );

    const blackPlayer:Player = new Player(
        "Lucas",
        Colors.Black,
    );

    const players = [blackPlayer, whitePlayer];

    useEffect(() => {
        setPlayer(whitePlayer);
    }, [setPlayer]);

    return (
        <div style={{ display: "grid" }}>
            <span style={{ color: "white" }}>Jogador: {player?.name} | Cor:{player?.color}</span>
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
            <button onClick={() => setPlayer(players.find(p => player?.color !== p.color))}>Mudar de cor</button>
        </div>
    );
};

export default Board;
