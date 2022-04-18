import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { logOut } from '../functions/logOut';

export function api() {
    if (typeof window !== 'undefined') {
        const cookies = parseCookies();

        const api = axios.create({
            baseURL: 'http://localhost:3333/',
            headers: {
                Authorization: `${cookies['firebaseAccount']}`,
            },
        });

        api.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                switch (error) {
                    case 'You does not have an account registered in our system.':
                        logOut();
                        break;

                    case 'Firebase ID token has \"kid\" claim which does not correspond to a known public key. Most likely the ID token is expired, so get a fresh token from your client app and try again.':
                        logOut();
                        break;

                    case 'Could not find the Token id, check if it is in the "authorization" field inside the request header.':
                        logOut();
                        break;

                    case 'Error on the idToken validation':
                        logOut();
                        break;

                    case 'Error on finding user':
                        logOut();
                        break;

                    default:
                        break;
                }

                if (error?.response?.status === 404) {
                    return {data: []}
                }

                return error;
            }
        );

        return api;
    }
}
