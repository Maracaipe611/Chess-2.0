import axios from "axios";
import { useCallback } from "react";

const useMatchClient = () => {
    const baseURL = `${process.env.REACT_APP_LOCAL_URL_API}/Match/`;

    const getMatch = useCallback((reference: string): Promise<any> => new Promise(
        (resolve, reject) => {
            axios.get(reference, { baseURL }).then((response: any) => {
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