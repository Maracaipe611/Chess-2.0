import React from "react";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import "./App.css";
import { GameContextProvider } from "./Components/GameLogic/useGameContext";
import Match from "./Components/Match";
import Menu from "./Components/Menu";

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
