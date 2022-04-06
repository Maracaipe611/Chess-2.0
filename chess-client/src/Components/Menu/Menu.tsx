import { useCallback, useState } from "react";
import "./Menu.css";
import useMatchClient from "../../client/MatchClient/UseMatchClient";
import { Match } from "../../client/Board/types";
import { useGameContext } from "../GameLogic/context";
import { useNavigate } from "react-router-dom";

enum MenuActions {
  Create,
  Join,
  View,
}
const Menu = () => {
  const [action, setAction] = useState<MenuActions | undefined>();
  const [matchId, setMatchId] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");

  const navigate = useNavigate();
  const matchClient = useMatchClient();
  const { setMatch } = useGameContext();

  const matchExists = useCallback(() => {
    matchClient().getMatch(matchId, playerName).then((match: Match) => {
      setMatch(match);
    }).then(() => {
      navigate("/play");
    });
  }, [matchClient, matchId, playerName]);

  const createMatch = useCallback(() => {
    matchClient().createMatch(matchId, playerName).then((match: Match) => {
      setMatch(match);
    }).then(() => {
      navigate("/play");
    });
  }, [matchClient, matchId, playerName]);

  const insertMatchReference = useCallback(() => (
    <div className="match-reference-background">
      <span>Digite seu nome</span>
      <input onInput={(e) => setPlayerName(e.currentTarget.value)} />
      <span>Digite o ID da partida</span>
      <input onInput={(e) => setMatchId(e.currentTarget.value)} />
      <button onClick={() => action === MenuActions.Join ? matchExists() : createMatch()}>{action === MenuActions.Join ? "Entrar" : "Criar"}</button>
    </div>
  ), [action, matchExists, createMatch]);

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