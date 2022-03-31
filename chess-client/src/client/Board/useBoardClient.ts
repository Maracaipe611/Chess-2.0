import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { useRef, useState, useEffect, useCallback } from "react";
import { useGameContext } from "../../Components/GameLogic/context";
import { mapMatchDTO } from "../Mappers/MatchMappers";
import { MatchDTO } from "../MatchClient/types";
import { Match } from "./types";

const useBoardClient = () => {
  const currentMatchRef = useRef<Match | undefined>();
  const connectionRef = useRef<HubConnectionState>();
  const [connection, setConnection] = useState<HubConnection>();
  const { match, setMatch } = useGameContext();

  currentMatchRef.current = match;

  const baseURL = process.env.REACT_APP_LOCAL_BASE_URL_API;

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

  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          connectionRef.current = connection.state;
          console.log("Connected!");

          connection.on("ReceiveNewBoard", (message: MatchDTO) => {
            const updatedMatch = mapMatchDTO(message);
            if (!updatedMatch) return null;
            setMatch(updatedMatch);
          });
        })
        .catch(e => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const sendMove = async (currentMatch: Match) => {
    if (connection?.state === HubConnectionState.Connected) {
      try {
        await connection.invoke("ValidateNewMatch", currentMatch);
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      alert("No connection to server yet.");
    }
  };

  return useCallback(() => {
    sendMove;
  }, [
    sendMove,
  ]);

};

export default useBoardClient;