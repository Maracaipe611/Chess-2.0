import React from "react";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import "./App.css";
import Menu from "./Components/Menu";
import { GameContextProvider } from "./Components/GameLogic/context";
import Match from "./Components/Match";

const App: React.FC = () => (
    <GameContextProvider>
        <Router>
            <Switch>
                <Route path="/" element={<Menu />} />
                <Route path="/play" element={<Match />} />
            </Switch>
        </Router>
    </GameContextProvider>
);

export default App;
