import React from "react";
import { BoardPage } from "./Components/Board";
import { GameContextProvider } from "./Components/GameLogic/context";
import "./App.css";

const App: React.FC = () => {
    return (
        <GameContextProvider>
            <div style={{ backgroundColor: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <BoardPage />
            </div>
        </GameContextProvider>
    );
};

export default App;
