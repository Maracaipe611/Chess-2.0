import React, { useEffect } from "react";
import { useGameContext } from "./GameLogic/context";
import { HouseComponent } from "./House/index";
import { Colors } from "./types";

const Board: React.FC = () => {
    const { boardHouses, setPlayer, player } = useGameContext();

    useEffect(() => {
        setPlayer({
            name: "lucas",
            color: Colors.White,
        });
    }, [setPlayer]);

    return (
        <div>
            <button onClick={() => setPlayer({
                name: "Lucas",
                color: player?.color === Colors.White ? Colors.Black : Colors.White
            })}>Mudar de cor</button>
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
                        key={house.getCurrentPosition()}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
