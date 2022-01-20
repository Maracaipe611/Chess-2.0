import React from 'react';
import { BoardPage } from './Components/Board';
import { HousesContextProvider } from './Components/Board/House/context';
import "./App.css";

const App: React.FC = () => {
  return (
    <HousesContextProvider>
        <div style={{ backgroundColor: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <BoardPage />
        </div>
    </HousesContextProvider>
  );
}

export default App;
