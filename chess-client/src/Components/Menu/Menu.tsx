import { useState } from "react";
import "./Menu.css";
import useMatchClient from "../../client/MatchClient/UseMatchClient";

enum MenuActions {
  Create,
  Join,
  View,
}
const Menu = () => {
    const [action, setAction] = useState<MenuActions | undefined>();
    const [matchId, setMatchId] = useState<string>("");
    const matchClient = useMatchClient();

    const matchExists = () => {
        matchClient().getMatch(matchId).then((response) => {
            console.log(response);
        });
        return true;
    };

    const insertMatchReference = () => (
        <div className="match-reference-background">
            <span>Digite o ID da partida</span>
            <input onInput={(e) => setMatchId(e.currentTarget.value)} />
            <button onClick={() => matchExists()}>Entrar</button>
        </div>
    );

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