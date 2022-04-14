import { useCallback, useLayoutEffect, useState } from "react";
import useMatchClient from "../../client/MatchClient";
import { Match } from "../../client/Board/types";
import { useGameContext } from "../GameLogic/useGameContext";
import { useNavigate } from "react-router-dom";
import useBoardClient from "../../client/Board/useBoardClient";
import "./Menu.css";

enum MenuActions {
  Create,
  Join,
  View,
}
const Menu = () => {
  const [action, setAction] = useState<MenuActions | undefined>();
  const [reference, setReference] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");

  const navigate = useNavigate();
  const matchClient = useMatchClient();
  const { setMatch, setPlayer, connected } = useGameContext();
  const { connect, joinMatch: introducePlayerOnMatch, joinMatchGroup } = useBoardClient();

  useLayoutEffect(() => {
    connect();
  }, [connected, connect]);

  const joinMatch = useCallback(() => {
    console.log("joinning Match");
    matchClient().joinMatch(reference, playerName).then((match: Match) => {
      const player = match.players.find((player) => player.name === playerName);
      if (!player) throw new Error("Não foi possível encontrar o jogador");
      setMatch(match);
      setPlayer(player);
    }).then(() => {
      joinMatchGroup(reference);
      introducePlayerOnMatch(reference);
    }).finally(() => {
      navigate("/play");
    });
  }, [matchClient, reference, playerName, joinMatchGroup, introducePlayerOnMatch, setMatch, setPlayer, navigate]);

  const createMatch = useCallback(() => {
    matchClient().createMatch(reference, playerName).then((match: Match) => {
      const player = match.players.find((player) => player.name === playerName);
      if (!player) throw new Error("Não foi possível encontrar o jogador");
      setMatch(match);
      setPlayer(player);
    }).then(() => {
      joinMatchGroup(reference);
    }).finally(() => {
      navigate("/play");
    });
  }, [matchClient, reference, playerName, joinMatchGroup, setMatch, setPlayer, navigate]);

  const insertMatchReference = useCallback(() => (
    <div className="match-reference-background">
      <span>Digite seu nome</span>
      <input onInput={(e) => setPlayerName(e.currentTarget.value)} />
      <span>Digite o ID da partida</span>
      <input onInput={(e) => setReference(e.currentTarget.value)} />
      <button onClick={() => action === MenuActions.Join ? joinMatch() : createMatch()}>{action === MenuActions.Join ? "Entrar" : "Criar"}</button>
    </div>
  ), [action, joinMatch, createMatch]);

  return (
    <div className="menu-background-main">
      <div className="menu-modal">
        <div className="modal-title">
          <span id="title">Xadrez do Lucão</span>
        </div>
        <div className="menu-actions">
          <button onClick={() => setAction(MenuActions.Create)}>Criar Partida</button>
          <button onClick={() => setAction(MenuActions.Join)}>Entrar numa Partida</button>
          <button onClick={() => setAction(MenuActions.View)}>Assistir Partida</button>
        </div>
      </div>
      <div className="menu-match-reference">
        {
          (action === MenuActions.Create || action === MenuActions.Join)
          &&
          insertMatchReference()
        }
      </div>
    </div>
  );
};

export default Menu;