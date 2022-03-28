import * as signalR from "@microsoft/signalr";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useGameContext } from "../../Components/GameLogic/context";

const useBoardClient = () => {
  const connectionRef = useRef<signalR.HubConnection>();
  const [isConnected, setIsConnected] = useState();
  const { match, setMatch } = useGameContext();

  useEffect(() => {
    if (!isConnected) {
      if (connectionRef.current) connectionRef.current.stop();
      return;
    }

    if (!connectionRef.current) {
      connectionRef.current = new signalR.HubConnectionBuilder()
        .withUrl("/matchHub")
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();
    }

    const { current: connection } = connectionRef;

    const watchMatch = async () => {
      try {
        const matchToWatch = await connection.invoke("watchMatch", match);
        setMatch(matchToWatch);
      } catch (error) {
        console.log(error);
      }
    };

    const start = () => {
      connection.start().then(async (...args) => {
        console.info("Connected!", args);
        await watchMatch();
      }).catch(err => {
        console.info(err);
        setTimeout(start, 500);
      });
    };

    if (connection.state === signalR.HubConnectionState.Connected) {
      watchMatch();
    }

    if (connection.state === signalR.HubConnectionState.Disconnected) {
      start();
    }

  }, [connectionRef, isConnected, match]);

};

export default useBoardClient;