import * as signalR from "@microsoft/signalr";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useGameContext } from "../../Components/GameLogic/context";

const useBoardClient = () => {
  const connectionRef = useRef<signalR.HubConnection>();
  const [isConnected, setIsConnected] = useState();
  const { match } = useGameContext();

  useEffect(() => {
    if (!isConnected) {
      if (connectionRef.current) connectionRef.current.stop();
      return;
    }

    if (!connectionRef.current) {
      connectionRef.current = new signalR.HubConnectionBuilder()
        .withUrl("/matchHub")
        .configureLogging(signalR.LogLevel.Information)
        .build();
    }

    const { current: connection } = connectionRef;

    const watchMatch = async () => {
      try {
        await connection.invoke("watchMatch", match);
      } catch (error) {
        console.log(error);
      }
    }

  }, [connectionRef, isConnected, match])
  
}