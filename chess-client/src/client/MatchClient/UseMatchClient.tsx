import axios from "axios";
import { useCallback } from "react";
import House from "../../Components/Board/House/types";
import { Piece } from "../../Components/Board/Piece/types";
import { Match } from "../../Components/Board/types";
import { Move } from "../../Components/GameLogic/Moves/moves";
import { MatchDTO } from "./types";

const useMatchClient = () => {
    const baseURL = `${process.env.REACT_APP_LOCAL_URL_API}/Match/`;

    const getMatch = useCallback((reference: string): Promise<any> => new Promise(
        (resolve, reject) => {
            axios.get(reference, { baseURL }).then((response: any) => {
                const matchDto:MatchDTO = response.data;
                const houses:Array<House> = matchDto.board?.map(house => {
                    return new House(
                        house.coordinate,
                        house.color,
                        new Piece(
                            "idqlqr",
                            house.piece.type,
                            house.piece.coordinate,
                            house.piece.color,
                            "imagem",
                            house.piece.move.map(m => {
                                const move:Move = {
                                    alpha: m.coordinate.alpha,
                                    index: m.coordinate.index,
                                    direction: m.direction,
                                };
                                return move;
                            }),
                        ),
                        "naosei",
                    );
                });
                const match = new Match(matchDto.id, houses, matchDto.players, matchDto.history);
                resolve(response.data);
            }, (response: any) => reject(response));
        }, 
    ), [baseURL]);

    const createMatch = useCallback((body: string): Promise<any> => new Promise(
        (resolve, reject) => {
            axios.post("", body, { baseURL }).then((response: any) => {
                resolve(response.data);
            }, (response: any) => reject(response));
        }, 
    ), [baseURL]);

    return useCallback(() => ({
        getMatch,
        createMatch,
    }), [
        getMatch,
        createMatch,
    ]);
};

export default useMatchClient;