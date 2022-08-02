import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGameContext } from "../../Components/GameLogic/useGameContext";
import House from "../../Components/House/types";
import { mapMatchDTO } from "../Mappers/MatchMappers";
import { MatchDTO } from "../MatchClient/types";
import { Match } from "./types";

const useBoardClient = () => {
  const currentMatchRef = useRef<Match | undefined>();
  const connectionRef = useRef<HubConnectionState>();
  const [connection, setConnection] = useState<HubConnection>();
  const { match, setMatch, connected, setConnected } = useGameContext();

  currentMatchRef.current = match;

  const baseURL = process.env.REACT_APP_LOCAL_BASE_URL_API;

  const connect = () => {
    setConnected(true);
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${baseURL}/hubs/matchHub`, {
        headers: {
          origin: window.location.origin,
        }
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

  }, [connected, baseURL]);

  useEffect(() => {
    if (!connection) return;
    connection.start()
      .then(() => {
        connectionRef.current = connection.state;
        console.log("Connected!");

        connection.on("NewPlayerJoined", (message: MatchDTO) => {
          console.log("New Player Joined");
          const updatedMatch = mapMatchDTO(message);
          if (updatedMatch) {
            setMatch(updatedMatch);
          }
        });

        connection.on("UpdateMatch", (message: MatchDTO) => {
          const updatedMatch = mapMatchDTO(message);
          if (!updatedMatch) return null;
          setMatch(updatedMatch);
        });
      })
      .catch(e => console.log("Connection failed: ", e));
  }, [connection, setMatch]);

  const sendMove = useCallback(async (selectedHouse: House, futureHouse: House) => {
    if (connection?.state === HubConnectionState.Connected && currentMatchRef.current) {
      try {
        await connection.invoke("UpdateMatch", selectedHouse, futureHouse, currentMatchRef.current.reference);
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      alert("No connection to server yet.");
    }
  }, [connection, currentMatchRef]);

  const joinMatch = useCallback(async (reference: string) => {
    if (connection?.state === HubConnectionState.Connected) {
      try {
        await connection.invoke("JoinMatch", reference);
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      alert("No connection to server yet.");
    }
  }, [connection]);

  const joinMatchGroup = useCallback(async (reference: string) => {
    if (connection?.state === HubConnectionState.Connected) {
      try {
        await connection.invoke("JoinMatchGroup", reference);
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      alert("No connection to server yet.");
    }
  }, [connection]);

  return { sendMove, connect, joinMatch, joinMatchGroup };

};

export default useBoardClient;