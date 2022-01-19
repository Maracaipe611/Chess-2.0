import React from 'react';
import { BoardPage } from './Components/Board';
import "./App.css";

const App: React.FC = () => {
  return (
    <div style={{backgroundColor: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <BoardPage/>
    </div>
  );
}

export default App;
