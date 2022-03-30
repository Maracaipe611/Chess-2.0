import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { Colors, Match } from "../../client/Board/types";
import { MatchDTO } from "./types";
import { createNewMatchDTO, mapMatchDTO } from "../Mappers/MatchMappers";

const useMatchClient = () => {
  const baseURL = `${process.env.REACT_APP_LOCAL_URL_API}/Match/`;

  const getMatch = useCallback((reference: string): Promise<Match | null> => new Promise(
    (resolve, reject) => {
      axios.get(reference, { baseURL }).then((response: AxiosResponse) => {
        const match = mapMatchDTO(response.data);
        resolve(match);
      }, (response: AxiosResponse) => reject(response));
    },
  ), [baseURL]);

  const createMatch = useCallback((reference: string, playerName: string): Promise<Match | null> => new Promise(
    (resolve, reject) => {
      const matchDto: MatchDTO = createNewMatchDTO(playerName, reference);

      axios.post("", matchDto, { baseURL }).then((response: AxiosResponse) => {
        const match = mapMatchDTO(response.data);
        resolve(match);
      }, (response: AxiosResponse) => reject(response));
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