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
                switch (error.response.data.error) {
                    case 'The user was not found':
                        logOut();
                        break;

                    case 'Firebase ID token has "kid" claim which does not correspond to a known public key. Most likely the ID token is expired, so get a fresh token from your client app and try again.':
                        logOut();
                        break;

                    case 'Firebase ID token has expired. Get a fresh ID token from your client app and try again (auth/id-token-expired). See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.':
                        logOut();
                        break;

                    case 'Decoding Firebase ID token failed. Make sure you passed the entire string JWT which represents an ID token. See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.':
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
                    return { data: [] };
                }

                return Promise.reject(error);
            }
        );

        return api;
    }
}
