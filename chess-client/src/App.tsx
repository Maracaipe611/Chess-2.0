import React from "react";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import { BoardPage } from "./Components/Board";
import { GameContextProvider } from "./Components/GameLogic/context";
import "./App.css";
import Menu from "./Components/Menu";

/* <GameContextProvider>
    <div style={{ backgroundColor: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <BoardPage />
    </div>
</GameContextProvider> */
const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" element={<Menu/>}/>
            </Switch>
        </Router>
    );
};

export default App;
