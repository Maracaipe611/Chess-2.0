import React from "react";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import { BoardPage } from "./client/Board";
import "./App.css";
import Menu from "./Components/Menu";
import { GameContextProvider } from "./Components/GameLogic/context";

/* 
    <div style={{ backgroundColor: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <BoardPage />
    </div>
</GameContextProvider> */
const App: React.FC = () => {
    return (
        <GameContextProvider>
            <Router>
                <Switch>
                    <Route path="/" element={<Menu/>}/>
                    <Route path="/play" element={<BoardPage/>}/>
                </Switch>
            </Router>
        </GameContextProvider>
    );
};

export default App;
